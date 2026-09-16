import { HiArrowRight } from 'react-icons/hi2'
import { Link } from 'react-router'

export function SectionHeader({
    title,
    subtitle,
    link,
    linkTo,
}: {
    title: string
    subtitle: string
    link: string
    linkTo: string
}) {
    return (
        <div className="flex items-end justify-between gap-4">
            <div>
                <h2 className="text-primary text-3xl font-bold">{title}</h2>
                <p className="text-muted mt-2 text-sm">{subtitle}</p>
            </div>
            <Link
                className="text-primary hover:bg-accent focus-visible:outline-accent group hidden cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 md:inline-flex"
                to={linkTo}
            >
                {link}
                <HiArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
        </div>
    )
}
