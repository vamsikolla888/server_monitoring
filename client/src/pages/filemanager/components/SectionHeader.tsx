
interface SectionHeaderProps {
    title: string;
    count: number;
}
export default function SectionHeader({ title, count }: SectionHeaderProps) {
    return (
        <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-neutral-200">{title}</h2>
            <span className="text-sm text-slate-500 dark:text-neutral-400">({count})</span>
        </div>
    )
}