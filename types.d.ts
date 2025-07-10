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
type ChapterSearchDocument = {
    type: "chapter";
    title: string;
    chapterId: string;
    chapterNumber: number;
    moduleName: string;
    moduleNumber: number;
    moduleSlug: string;
    courseCode: string;
    courseName: string;
};
type SectionSearchDocument = {
    type: "section";
    title: string;
    sectionId: string;
    parent: string[];
    level: number;
    moduleName: string;
    moduleNumber: number;
    moduleSlug: string;
    courseCode: string;
    courseName: string;
};
type TermSearchDocument = {
    type: "term";
};
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
type SearchDocument =
    | CourseSearchDocument
    | ModuleSearchDocument
    | ChapterSearchDocument
    | SectionSearchDocument
    | TermSearchDocument
    | FigureSearchDocument
    | QuestionSearchDocument;
