
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, ListOrdered, Quote, Heading1, Heading2, Strikethrough } from "lucide-react";
import { cn } from "@/lib/utils";

interface TiptapEditorProps {
    content: string;
    onChange: (content: string) => void;
}

const TiptapEditor = ({ content, onChange }: TiptapEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2],
                }
            }),
        ],
        content: content,
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none focus:outline-none min-h-[300px] p-4 text-foreground/90 leading-relaxed',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) {
        return null;
    }

    const ToolbarButton = ({
        isActive,
        onClick,
        icon: Icon,
        title
    }: {
        isActive: boolean;
        onClick: () => void;
        icon: React.ElementType;
        title: string
    }) => (
        <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClick}
            className={cn(
                "h-8 w-8 p-0 hover:bg-white/10 transition-colors",
                isActive ? "bg-white/20 text-primary" : "text-muted-foreground"
            )}
            title={title}
        >
            <Icon className="w-4 h-4" />
        </Button>
    );

    return (
        <div className="border border-white/10 rounded-xl overflow-hidden bg-secondary/5 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-2 border-b border-white/10 bg-white/5 flex-wrap">
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    isActive={editor.isActive('heading', { level: 1 })}
                    icon={Heading1}
                    title="제목 1"
                />
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive('heading', { level: 2 })}
                    icon={Heading2}
                    title="제목 2"
                />
                <div className="w-px h-4 bg-white/10 mx-1" />
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                    icon={Bold}
                    title="굵게"
                />
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                    icon={Italic}
                    title="기울임"
                />
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    isActive={editor.isActive('strike')}
                    icon={Strikethrough}
                    title="취소선"
                />
                <div className="w-px h-4 bg-white/10 mx-1" />
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                    icon={List}
                    title="글머리 기호"
                />
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                    icon={ListOrdered}
                    title="번호 매기기"
                />
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive('blockquote')}
                    icon={Quote}
                    title="인용구"
                />
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} />
        </div>
    );
};

export default TiptapEditor;
