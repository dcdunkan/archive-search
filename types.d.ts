// todo: make this shared.

// === SEARCH INDEX
type SearchDocument =
	| CourseSearchDocument
	| ModuleSearchDocument
	| ChapterSearchDocument
	| SectionSearchDocument;

type BaseSearchDocument = {
	id: string;
	type: "course" | "module" | "chapter" | "section";
	title: string;
};

// Global scope: courses, and other possible utilities

interface CourseSearchDocument extends BaseSearchDocument {
	type: "course";
	context: {
		courseCode: string;
		courseName: string;
	};
}

// Course scope: modules

interface ModuleSearchDocument extends BaseSearchDocument {
	type: "module";

	context: {
		courseCode: string;
		courseName: string;

		moduleNumber: number;
		moduleSlug: string;
		moduleName: string;
	};
}

// Module Scope: chapters, sections, questions, figures, videos, terms.

interface ChapterSearchDocument extends BaseSearchDocument {
	type: "chapter";

	context: {
		courseCode: string;
		courseName: string;

		moduleSlug: string;
		moduleNumber: number;
		moduleName: string;

		chapterSlug: string;
		chapterNumber: number;
		chapterName: string;
	};
}

interface SectionSearchDocument extends BaseSearchDocument {
	type: "section";

	context: {
		courseCode: string;
		courseName: string;

		moduleSlug: string;
		moduleNumber: number;
		moduleName: string;

		chapterSlug: string;
		chapterNumber: number;
		chapterName: string;

		sectionParent: string[];
		sectionSlug: string;
	};
}