// todo: make this shared.
type CourseSearchDocument = {
    type: "course";
    name: string;
    code: string;
    modules: number;
};
type ModuleSearchDocument = {
    type: "module";
    name: string;
    number: number;
    slug: string;
    courseCode: string;
    courseName: string;
};
// todo: full text search through the content (use smthing like remove-markdown?)
type ChapterSearchDocument = {
    type: "chapter";
    title: string;
    chapterId: string;
    chapterNumber: number;
};
type SectionSearchDocument = {
    type: "section";
    title: string;
    sectionId: string;
    parent: string[];
    level: number;
};
type TermSearchDocument = {
    type: "term";
}; // what about glossary??

// todo:
type FigureSearchDocument = {
    type: "figure";
    figure_type: "image" | "diagram";
    src: string;
    caption: string;
    alt: string;
};
type QuestionSearchDocument = {
    type: "question";
};
// could todo:
// - video descriptions/transcripts
// - bits & ai based search result

// todo: make this shared
type SearchDocument =
    | CourseSearchDocument
    | ModuleSearchDocument
    | ChapterSearchDocument
    | SectionSearchDocument
    | TermSearchDocument
    | FigureSearchDocument
    | QuestionSearchDocument;
