'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import Bold from '@tiptap/extension-bold';
import { useEffect } from 'react';
import { List } from 'lucide-react';

type Props = {
    content: string;
    onChange: (value: string) => void;
};

export default function RichEditer({ content, onChange }: Props) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                bulletList: false,
                listItem: false,
            }),
            Bold,
            BulletList,
            ListItem,
        ],
        content,
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        return () => {
            editor?.destroy();
        };
    }, [editor]);

    if (!editor) return null;

    return (
        <div className="border rounded p-2 space-y-2">
            {/* Custom Toolbar */}
            <div className="flex space-x-2 mb-2">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'font-extrabold text-blue-600' : ''}
                >
                    B
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'text-blue-600' : ''}
                >
                    <List />
                </button>
            </div>

            {/* Editor Box */}
            <EditorContent editor={editor} className="min-h-[100px] h-[50px] overflow-auto p-2 border rounded" />
        </div>
    );
}
