type CategoryChipsProps = {
    categories: string[]
}

export function CategoryChips({ categories }: CategoryChipsProps) {
    return (
        <div className="text-muted mt-4 flex flex-col gap-3 text-sm md:flex-row md:items-center">
            <span className="text-primary shrink-0 font-semibold">
                Популярні категорії:
            </span>
            <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                    <span
                        className="border-border bg-surface rounded-full border px-4 py-2 text-sm shadow-sm"
                        key={category}
                    >
                        {category}
                    </span>
                ))}
            </div>
        </div>
    )
}
