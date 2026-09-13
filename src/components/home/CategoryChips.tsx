import { cn } from '@/components/ui/utils'
import type { Category, CategoryKey } from '@/types'

type CategoryChipsProps = {
    categories: Category[]
    selectedCategory: CategoryKey | ''
    onCategoryChange: (category: CategoryKey | '') => void
}

export function CategoryChips({
    categories,
    selectedCategory,
    onCategoryChange,
}: CategoryChipsProps) {
    return (
        <div className="text-muted mt-4 flex flex-col gap-3 text-sm md:flex-row md:items-center">
            <span className="text-primary shrink-0 font-semibold">
                Популярні категорії:
            </span>
            <div className="flex flex-wrap gap-3">
                {categories.map((category) => {
                    const isSelected = selectedCategory === category.key

                    return (
                        <button
                            className={cn(
                                'border-border bg-surface hover:border-primary/30 hover:text-primary focus-visible:outline-accent cursor-pointer rounded-full border px-4 py-2 text-sm shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
                                isSelected &&
                                    'border-accent bg-accent/20 text-primary'
                            )}
                            type="button"
                            key={category.key}
                            aria-pressed={isSelected}
                            onClick={() =>
                                onCategoryChange(isSelected ? '' : category.key)
                            }
                        >
                            {category.label}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
