import { HiArrowRight } from 'react-icons/hi2'

export function SectionHeader({
    title,
    subtitle,
    link,
}: {
    title: string
    subtitle: string
    link: string
}) {
    return (
        <div className="flex items-end justify-between gap-4">
            <div>
                <h2 className="text-primary text-3xl font-bold">{title}</h2>
                <p className="text-muted mt-2 text-sm">{subtitle}</p>
            </div>
            <span className="text-primary hidden items-center gap-2 text-sm md:inline-flex">
                {link}
                <HiArrowRight className="size-4" />
            </span>
        </div>
    )
}
