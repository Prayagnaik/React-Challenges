import Button from "./Button";
import FormInput from "./FormInput";

interface FilterBarProps {
  filter: "all" | "active" | "completed";
  categoryFilter: string;
  categories: string[];
  sortOrder: string;
  searchText: string;
  setSortOrder: (sort: string) => void;
  onFilterChange: (
    filter: "all" | "active" | "completed",
  ) => void;
  setSearchText: (text: string) => void;
  onCategoryChange: (category: string) => void;
}

export default function FilterBar({
  filter,
  categoryFilter,
  categories,
  sortOrder,
  searchText,
  setSortOrder,
  onFilterChange,
  setSearchText,
  onCategoryChange,
}: FilterBarProps) {
  return (
    <div>
      <Button
        variant={filter === "all" ? "primary" : "secondary"}
        onClick={() => onFilterChange("all")}
      >
        All
      </Button>

      <Button
        variant={
          filter === "active"
            ? "primary"
            : "secondary"
        }
        onClick={() => onFilterChange("active")}
      >
        Active
      </Button>

      <Button
        variant={
          filter === "completed"
            ? "primary"
            : "secondary"
        }
        onClick={() => onFilterChange("completed")}
      >
        Completed
      </Button>

      <select
        id="category-filter"
        value={categoryFilter}
        onChange={(e) =>
          onCategoryChange(e.target.value)
        }
      >
        <option value="">All Categories</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <FormInput
        id="task-search"
        label=""
        type="text"
        placeholder="Search tasks..."
        value={searchText}
        onChange={(e) =>
          setSearchText(e.target.value)
        }
      />

      {searchText && (
        <Button
          id="clear-search"
          variant="secondary"
          onClick={() => setSearchText("")}
        >
          Clear search
        </Button>
      )}

      <select
        id="sort-order"
        value={sortOrder}
        onChange={(e) =>
          setSortOrder(e.target.value)
        }
      >
        <option value="recent">
          Recently Added
        </option>

        <option value="high">
          Priority High to Low
        </option>

        <option value="low">
          Priority Low to High
        </option>

        <option value="alpha">
          Alphabetical
        </option>

        <option value="due">
          Due Date (Soonest First)
        </option>
      </select>
    </div>
  );
}