"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getAllTemplates,
  TemplateRepo,
} from "@/lib/template-repos";
import {
  ExternalLink,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Navigation from "@/components/navigation";

export default function TemplatesPage() {
  const [templates] = useState<TemplateRepo[]>(getAllTemplates());
  const [filteredTemplates, setFilteredTemplates] =
    useState<TemplateRepo[]>(templates);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const categories = [
    { value: "all", label: "All Templates" },
    { value: "nextjs", label: "Next.js" },
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "express", label: "Express" },
    { value: "fullstack", label: "Full-Stack" },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterTemplates(query, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterTemplates(searchQuery, category);
  };

  const filterTemplates = (query: string, category: string) => {
    let filtered = templates;

    // Filter by category
    if (category !== "all") {
      filtered = filtered.filter((t) => t.tags.includes(category));
    }

    // Filter by search query
    if (query) {
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.description.toLowerCase().includes(query.toLowerCase()) ||
          t.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }

    setFilteredTemplates(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTemplates = useMemo(
    () => filteredTemplates.slice(startIndex, endIndex),
    [filteredTemplates, startIndex, endIndex]
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };



  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <div className="text-center py-8 sm:py-12 md:py-16 px-4">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              Template Library
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            Production-ready starter templates for your next project
          </p>
        </div>

        <main className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16 max-w-7xl">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 h-10 sm:h-11"
              />
            </div>
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full sm:w-[200px] h-10 sm:h-11">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-[140px] h-10 sm:h-11">
                <SelectValue placeholder="Per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6 per page</SelectItem>
                <SelectItem value="9">9 per page</SelectItem>
                <SelectItem value="12">12 per page</SelectItem>
                <SelectItem value="18">18 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          {filteredTemplates.length > 0 && (
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredTemplates.length)} of{" "}
              {filteredTemplates.length} templates
            </div>
          )}


          {/* Templates Grid */}
          {filteredTemplates.length === 0 ? (
            <Card className="p-8 sm:p-12 text-center">
              <p className="text-sm sm:text-base text-muted-foreground">
                No templates found. Try a different search or category.
              </p>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {currentTemplates.map((template) => (
                  <Card
                    key={template.name}
                    className="p-5 sm:p-6 hover:shadow-lg transition flex flex-col"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold mb-2">{template.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                        {template.description}
                      </p>

                      <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                        <div className="flex flex-wrap gap-1">
                          {template.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="text-xs text-muted-foreground">
                          <strong>Features:</strong>
                          <ul className="list-disc list-inside mt-1 space-y-0.5">
                            {template.features.slice(0, 3).map((feature) => (
                              <li key={feature}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <a
                        href={template.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button className="w-full cursor-pointer text-sm sm:text-base">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View on GitHub
                        </Button>
                      </a>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Previous Button */}
                  <Button
                    variant="outline"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="w-full sm:w-auto"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-2 flex-wrap justify-center">
                    {getPageNumbers().map((page, index) => (
                      <div key={index}>
                        {page === "..." ? (
                          <span className="px-3 py-2 text-muted-foreground">...</span>
                        ) : (
                          <Button
                            variant={currentPage === page ? "default" : "outline"}
                            onClick={() => goToPage(page as number)}
                            className="w-10 h-10 p-0"
                          >
                            {page}
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Next Button */}
                  <Button
                    variant="outline"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="w-full sm:w-auto"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}
