/**
 * WriteView - LaTeX editor interface mockup
 * Shows file browser, Monaco-style editor, and PDF preview
 *
 * Used for both "Write" and "Cite" tabs (with showCitation prop)
 */

import { ActivityBar } from "../shared/ActivityBar";
import {
  DocumentIcon,
  FolderIcon,
  PlusIcon,
  ChevronRightIcon,
  CloseIcon,
  UndoIcon,
  RedoIcon,
  LinkIcon,
  ImageIcon,
  CitationIcon,
  TableIcon,
  SearchIcon,
  PlayIcon,
  CheckIcon,
  DownloadIcon,
  ChevronDownIcon,
} from "../shared/Icons";

interface WriteViewProps {
  showCitation?: boolean;
  isActive?: boolean;
  onComplete?: () => void;
}

export function WriteView({ showCitation = false }: WriteViewProps) {
  return (
    <div className="flex h-[420px]">
      <ActivityBar variant="editor" />

      {/* Sidebar - File Browser */}
      <FileBrowserSidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 bg-background">
        {/* Tab bar */}
        <div className="h-11 flex items-center gap-1 px-2 bg-secondary/50 border-b border-border/20">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-card text-foreground text-sm">
            <DocumentIcon />
            <span>Main.tex</span>
            <button className="w-4 h-4 flex items-center justify-center text-muted-foreground hover:text-foreground rounded">
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Editor + PDF split */}
        <div className="flex-1 flex min-h-0">
          <EditorPane showCitation={showCitation} />
          <PDFPreviewPane showCitation={showCitation} />
        </div>
      </div>
    </div>
  );
}

function FileBrowserSidebar() {
  return (
    <div className="w-64 bg-card flex flex-col">
      <div className="h-11 flex items-center justify-between px-4 border-b border-border/20">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          File Browser
        </span>
        <button className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded">
          <PlusIcon />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <FileItem name="Main.tex" selected />
        <FileItem name="chapter1.tex" />
        <FileItem name="references.bib" />
        <FileItem name="figures/" isFolder />

        <div className="mt-4 pt-4 border-t border-border/20">
          <div className="flex items-center gap-2 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <ChevronRightIcon />
            <span>Outline</span>
          </div>
          <div className="space-y-0.5 mt-1">
            <OutlineItem label="Introduction" />
            <OutlineItem label="Methods" />
            <OutlineItem label="Results" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FileItem({
  name,
  selected = false,
  isFolder = false,
}: {
  name: string;
  selected?: boolean;
  isFolder?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
        selected
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-secondary/50"
      }`}
    >
      {isFolder ? (
        <FolderIcon className="w-4 h-4 flex-shrink-0" />
      ) : (
        <DocumentIcon className="w-4 h-4 flex-shrink-0" />
      )}
      <span className="truncate">{name}</span>
    </div>
  );
}

function OutlineItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
      <span className="text-muted-foreground/50">§</span> {label}
    </div>
  );
}

function EditorPane({ showCitation }: { showCitation: boolean }) {
  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Toolbar */}
      <div className="h-11 flex items-center gap-1 px-3 border-b border-border/10">
        <ToolbarButton icon={<UndoIcon />} />
        <ToolbarButton icon={<RedoIcon />} />
        <ToolbarDivider />
        <ToolbarButton icon={<span className="text-sm font-bold">B</span>} />
        <ToolbarButton icon={<span className="text-sm italic">I</span>} />
        <ToolbarDivider />
        <ToolbarButton icon={<LinkIcon />} />
        <ToolbarButton icon={<ImageIcon />} />
        <ToolbarButton
          icon={<CitationIcon />}
          active={showCitation}
        />
        <ToolbarButton icon={<TableIcon />} />
        <div className="flex-1" />
        <ToolbarButton icon={<SearchIcon />} />
      </div>

      {/* Editor content */}
      <div className="flex-1 p-4 font-mono text-xs sm:text-sm overflow-auto">
        <div className="space-y-1">
          <EditorLine num={1} content={<><span className="text-primary">\documentclass</span><span className="text-amber-500">{`{`}</span>article<span className="text-amber-500">{`}`}</span></>} />
          <EditorLine num={2} />
          <EditorLine num={3} content={<><span className="text-primary">\usepackage</span><span className="text-amber-500">{`{`}</span>graphicx<span className="text-amber-500">{`}`}</span></>} />
          <EditorLine num={4} content={<><span className="text-primary">\usepackage</span><span className="text-amber-500">{`{`}</span>biblatex<span className="text-amber-500">{`}`}</span></>} />
          <EditorLine num={5} />
          <EditorLine num={6} content={<><span className="text-primary">\begin</span><span className="text-amber-500">{`{`}</span>document<span className="text-amber-500">{`}`}</span></>} />
          <EditorLine num={7} />
          <EditorLine num={8} content={<><span className="text-primary">\section</span><span className="text-amber-500">{`{`}</span>Introduction<span className="text-amber-500">{`}`}</span></>} />
          <EditorLine num={9} content={<span className="text-foreground">Recent studies have shown that climate</span>} />
          <EditorLine
            num={10}
            content={
              <span className="text-foreground">
                change impacts biodiversity{" "}
                <span className={`px-1 rounded ${showCitation ? 'text-violet bg-violet/20 animate-pulse' : 'text-violet bg-violet/10'}`}>
                  \cite{`{`}smith2024{`}`}
                </span>
                .
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
}

function EditorLine({ num, content }: { num: number; content?: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="w-6 text-right text-muted-foreground/50 select-none">{num}</span>
      <span>{content}</span>
    </div>
  );
}

function ToolbarButton({ icon, active = false }: { icon: React.ReactNode; active?: boolean }) {
  return (
    <button
      className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
        active
          ? "text-primary bg-primary/10"
          : "text-muted-foreground hover:bg-secondary/50"
      }`}
    >
      {icon}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="w-px h-5 bg-border/30 mx-1" />;
}

function PDFPreviewPane({ showCitation }: { showCitation: boolean }) {
  return (
    <div className="hidden sm:flex flex-1 flex-col bg-secondary/10 min-w-0">
      {/* Toolbar */}
      <div className="h-11 flex items-center justify-between px-3 border-b border-border/10">
        <button className="flex items-center gap-1.5 px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded transition-colors">
          <PlayIcon className="w-4 h-4 text-emerald" />
          <span>Recompile</span>
          <ChevronDownIcon />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-1 text-xs text-emerald">
            <CheckIcon />
            <span>0</span>
          </div>
          <button className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded transition-colors">
            <DownloadIcon />
          </button>
          <div className="w-px h-5 bg-border/30" />
          <div className="flex items-center gap-0.5">
            <button className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground rounded text-xs">−</button>
            <span className="text-xs text-muted-foreground px-1 min-w-[32px] text-center">100%</span>
            <button className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground rounded text-xs">+</button>
          </div>
        </div>
      </div>

      {/* PDF content */}
      <div className="flex-1 flex items-center justify-center overflow-hidden p-2">
        <div className="h-full w-full max-w-[280px] bg-white rounded-sm shadow-md overflow-hidden">
          <div className="h-full p-4 text-gray-800 font-serif overflow-auto">
            <h1 className="text-[9px] font-bold text-center mb-0.5 text-gray-900">
              Climate Change Impacts on Global Biodiversity
            </h1>
            <p className="text-[6px] text-center text-gray-600 mb-2">
              J. Smith, A. Johnson, M. Williams
            </p>
            <div className="mb-2">
              <p className="font-bold text-[7px] mb-0.5">Abstract</p>
              <p className="text-gray-600 text-[6px] leading-relaxed">
                This study examines the relationship between climate patterns and species distribution across multiple ecosystems.
              </p>
            </div>
            <p className="font-bold text-[8px] mb-1">1. Introduction</p>
            <p className="text-[6px] leading-relaxed mb-1.5">
              Recent studies have shown that climate change impacts biodiversity in significant ways. The relationship between temperature changes and species migration has been documented{" "}
              <span className={`${showCitation ? 'bg-sky-200 text-sky-700' : 'bg-sky-100 text-sky-600'} px-0.5 rounded transition-colors`}>
                [1]
              </span>
              . Furthermore, habitat loss combined with shifting climate zones creates compounding effects.
            </p>
            <p className="text-[6px] leading-relaxed mb-2 text-gray-700">
              Our research builds upon previous work by analyzing long-term datasets from multiple continents.
            </p>
            <p className="font-bold text-[8px] mb-1">2. Methods</p>
            <p className="text-[6px] leading-relaxed text-gray-700 mb-1.5">
              We analyzed data from 150 monitoring stations across three continents over a 20-year period.
            </p>
            <p className="font-bold text-[8px] mb-1">3. Results</p>
            <p className="text-[6px] leading-relaxed text-gray-700">
              Our findings indicate a strong correlation (r = 0.87) between temperature anomalies and species migration patterns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export duration for tab controller (static for now, will be animated later)
export const WRITE_DURATION = 5000;
