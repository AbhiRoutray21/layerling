import { describe, expect, it } from "vitest";
import {
  ATTACHMENT_LIMITS,
  AttachmentError,
  attachmentAcceptList,
  attachmentFileProblem,
  attachmentListProblem,
  attachmentNameProblem,
  attachmentTypeForFileName,
  cleanAttachmentName,
  findAttachmentByName,
  freeAttachmentName,
  projectAttachmentFromBytes,
  withAttachmentAdded,
  withAttachmentRemoved,
  withAttachmentReplaced,
} from "@/lib/projectAttachments";
import type { ProjectAttachment } from "@/types/layerling";

/*
 * Files kept with a design (#820): what may be attached, how a name is kept clean and free, and the
 * limits of one file and of the whole list.
 */

const text = (content: string) => new TextEncoder().encode(content);

async function attachment(name: string, content = "hello") {
  return projectAttachmentFromBytes(name, text(content));
}

describe("which files may be attached", () => {
  it("accepts Markdown and plain text, whatever the case of the extension", () => {
    expect(attachmentTypeForFileName("notes.md")?.mediaType).toBe("text/markdown");
    expect(attachmentTypeForFileName("Parts List.TXT")?.mediaType).toBe("text/plain");
    expect(attachmentAcceptList()).toBe(".md,.txt");
  });

  it("refuses other types, a name without an extension, and an extension alone", () => {
    for (const name of ["datasheet.pdf", "photo.png", "drawing.svg", "page.html", "script.js", "README", ".md", "notes.md.exe"]) {
      expect(attachmentFileProblem(name, text("x")), name).not.toBeNull();
    }
    expect(attachmentNameProblem(".md")).toBe("name");
    expect(attachmentNameProblem("README")).toBe("name");
    expect(attachmentNameProblem("datasheet.pdf")).toBe("type");
  });

  it("refuses an empty file and one over the size limit, and accepts one of exactly the limit", () => {
    expect(attachmentFileProblem("a.txt", new Uint8Array())).toBe("empty");
    expect(attachmentFileProblem("a.txt", new Uint8Array(ATTACHMENT_LIMITS.fileBytes + 1).fill(97))).toBe("tooBig");
    expect(attachmentFileProblem("a.txt", new Uint8Array(ATTACHMENT_LIMITS.fileBytes).fill(97))).toBeNull();
  });

  it("refuses a file that is not text under a text name", () => {
    expect(attachmentFileProblem("a.md", new Uint8Array([0x23, 0x00, 0x41]))).toBe("notText");
    expect(attachmentFileProblem("a.txt", new Uint8Array([0xff, 0xfe, 0x41]))).toBe("notText");
    expect(attachmentFileProblem("a.txt", text("Größe 20 mm - 日本語"))).toBeNull();
  });
});

describe("names", () => {
  it("cleans a name: no folders, no control characters, single spaces, a length limit that keeps the extension", () => {
    expect(cleanAttachmentName("C:\\Users\\me\\notes.md")).toBe("notes.md");
    expect(cleanAttachmentName("../../etc/notes.txt")).toBe("notes.txt");
    expect(cleanAttachmentName("  my \t\n notes\u0000.md ")).toBe("my notes.md");
    const long = cleanAttachmentName(`${"a".repeat(300)}.md`);
    expect(long).toHaveLength(ATTACHMENT_LIMITS.nameLength);
    expect(long.endsWith("a.md")).toBe(true);
  });

  it("finds a name without regard to case", async () => {
    const list = [await attachment("Notes.MD")];
    expect(findAttachmentByName(list, "notes.md")?.name).toBe("Notes.MD");
    expect(findAttachmentByName(list, "other.md")).toBeUndefined();
    expect(attachmentNameProblem("NOTES.md", ["notes.MD"])).toBe("nameTaken");
  });

  it("offers the first free name, numbering before the extension", async () => {
    const list = [await attachment("notes.md"), await attachment("notes 2.md"), await attachment("Notes 3.md")];
    expect(freeAttachmentName([], "notes.md")).toBe("notes.md");
    expect(freeAttachmentName(list, "other.md")).toBe("other.md");
    expect(freeAttachmentName(list, "notes.md")).toBe("notes 4.md");
    expect(freeAttachmentName(list, "NOTES.MD")).toBe("NOTES 4.MD");
  });

  it("a name that is not clean is a name problem, and a clean one of an allowed type is none", () => {
    expect(attachmentNameProblem("my  notes.md")).toBe("name");
    expect(attachmentNameProblem("folder/notes.md")).toBe("name");
    expect(attachmentNameProblem("my notes.md")).toBeNull();
  });
});

describe("making an attachment", () => {
  it("reads the type from the content check and keeps its own copy of the bytes", async () => {
    const bytes = text("# Parts\n- 4 screws");
    const made = await projectAttachmentFromBytes("../Parts.MD", bytes);
    expect(made.name).toBe("Parts.MD");
    expect(made.mediaType).toBe("text/markdown");
    expect(made.byteLength).toBe(bytes.byteLength);
    expect(made.sha256).toMatch(/^[0-9a-f]{64}$/);
    expect(made.id).toMatch(/^attachment-/);
    bytes[0] = 0x58;
    expect(made.bytes[0]).toBe(0x23);
  });

  it("gives the same hash for the same bytes and a different one for others", async () => {
    expect((await attachment("a.txt", "same")).sha256).toBe((await attachment("b.txt", "same")).sha256);
    expect((await attachment("a.txt", "same")).sha256).not.toBe((await attachment("a.txt", "other")).sha256);
  });

  it("throws an AttachmentError that names the problem", async () => {
    const error = await projectAttachmentFromBytes("scan.pdf", text("x")).catch((caught: unknown) => caught);
    expect(error).toBeInstanceOf(AttachmentError);
    expect((error as AttachmentError).problem).toBe("type");
    expect((error as AttachmentError).message).toContain("scan.pdf");
  });
});

describe("the list of attachments", () => {
  it("adds, replaces in place keeping the id, and removes", async () => {
    const first = await attachment("a.md", "one");
    const second = await attachment("b.txt", "two");
    let list: readonly ProjectAttachment[] = withAttachmentAdded(withAttachmentAdded([], first), second);
    expect(list.map((entry) => entry.name)).toEqual(["a.md", "b.txt"]);

    const replacement = await attachment("a.md", "three three");
    list = withAttachmentReplaced(list, first.id, replacement);
    expect(list.map((entry) => entry.name)).toEqual(["a.md", "b.txt"]);
    expect(list[0].id).toBe(first.id);
    expect(list[0].byteLength).toBe("three three".length);

    expect(withAttachmentRemoved(list, first.id).map((entry) => entry.name)).toEqual(["b.txt"]);
  });

  it("will not add a name that is taken, and will not replace into another file's name", async () => {
    const first = await attachment("a.md");
    const second = await attachment("b.md");
    expect(() => withAttachmentAdded([first], renamed(second, "A.MD"))).toThrow(/already attached/);
    expect(() => withAttachmentReplaced([first, second], second.id, renamed(second, "a.md"))).toThrow(/already attached/);
    expect(() => withAttachmentReplaced([first, second], first.id, renamed(first, "A.md"))).not.toThrow();
  });

  it("holds at most 16 files and 8 MB together, and counts a replacement by its difference", async () => {
    const files: ProjectAttachment[] = [];
    for (let index = 0; index < ATTACHMENT_LIMITS.files; index += 1) files.push(await attachment(`f${index}.txt`));
    expect(attachmentListProblem(files)).toBeNull();
    await expect(async () => withAttachmentAdded(files, await attachment("one-more.txt"))).rejects.toThrow(/at most 16/);

    const big = new Uint8Array(ATTACHMENT_LIMITS.fileBytes).fill(97);
    const four = await Promise.all([0, 1, 2, 3].map((index) => projectAttachmentFromBytes(`big${index}.txt`, big)));
    expect(attachmentListProblem(four)).toBeNull();
    const fifth = await projectAttachmentFromBytes("big4.txt", big);
    expect(attachmentListProblem([...four, fifth])).toEqual({ problem: "tooMuch" });
    expect(() => withAttachmentAdded(four, fifth)).toThrow(/8 MB/);
    // A bigger file in place of a small one only counts what it adds.
    const small = await attachment("small.txt", "x");
    const grown = await projectAttachmentFromBytes("small.txt", big);
    expect(() => withAttachmentReplaced([...four, small], small.id, grown)).toThrow(/8 MB/);
    expect(() => withAttachmentReplaced([...four.slice(0, 3), small], small.id, grown)).not.toThrow();
  });

  it("finds a list's problem by name before it counts", async () => {
    const one = await attachment("a.md");
    expect(attachmentListProblem([one, { ...one, id: "other", name: "A.md" }])).toEqual({ problem: "nameTaken", fileName: "A.md" });
    expect(attachmentListProblem([{ ...one, name: "a/b.md" }])).toEqual({ problem: "name", fileName: "a/b.md" });
  });
});

/** The same attachment under another name, for the list tests. */
function renamed(source: ProjectAttachment, name: string): ProjectAttachment {
  return { ...source, name };
}
