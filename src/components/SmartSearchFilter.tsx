import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import courseReact from "@/assets/course-react.jpg";
import courseJavaScript from "@/assets/course-javascript.jpg";
import courseUXDesign from "@/assets/course-ux-design.jpg";

const categories = ["Technology", "Science", "Arts", "Business", "Health"];
const levels = ["Beginner", "Intermediate", "Advanced"];
const languages = ["English", "French", "Arabic"];

const mockCourses = [
  {
    imageSrc: courseReact,
    title: "React Development Fundamentals",
    instructor: "John Smith",
    rating: 4.8,
    reviews: 1234,
    price: "$49",
    badge: "Popular"
  },
  {
    imageSrc: courseJavaScript, 
    title: "Advanced JavaScript",
    instructor: "Sarah Johnson",
    rating: 4.9,
    reviews: 987,
    price: "$79",
    badge: "New"
  },
  {
    imageSrc: courseUXDesign,
    title: "UI/UX Design Principles", 
    instructor: "Mike Davis",
    rating: 4.7,
    reviews: 756,
    price: "Free",
    badge: "Featured"
  }
];

export default function SmartSearchFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sort, setSort] = useState("popularity");
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [showWithCertificates, setShowWithCertificates] = useState(false);
  const [showRecentlyAdded, setShowRecentlyAdded] = useState(false);
  const [showShortCourses, setshowShortCourses] = useState(false);

  return (
    <section className="bg-background py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm font-medium text-primary mb-2 uppercase tracking-wider border border-primary px-3 py-1 inline-block rounded-md">
            Catalog
          </p>
          <h2 className="text-4xl font-bold text-foreground mb-12">
            Explore <span className="text-primary">Courses</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="w-full md:w-1/6 space-y-6">
            {/* Category Filter */}
            <div>
              <Label className="text-xs font-bold tracking-widest text-primary mb-4 block">
                CATEGORY
              </Label>
              <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <div key={cat} className="flex items-center space-x-2">
                      <RadioGroupItem value={cat} id={cat} />
                      <Label
                        htmlFor={cat}
                        className="text-sm cursor-pointer hover:text-primary text-muted-foreground"
                      >
                        {cat}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Level Filter */}
            <div>
              <Label className="text-xs font-bold tracking-widest text-primary mb-4 block">
                LEVEL
              </Label>
              <RadioGroup value={selectedLevel} onValueChange={setSelectedLevel}>
                <div className="space-y-3">
                  {levels.map((lvl) => (
                    <div key={lvl} className="flex items-center space-x-2">
                      <RadioGroupItem value={lvl} id={lvl} />
                      <Label
                        htmlFor={lvl}
                        className="text-sm cursor-pointer hover:text-primary text-muted-foreground"
                      >
                        {lvl}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Language Filter */}
            <div>
              <Label className="text-xs font-bold tracking-widest text-primary mb-4 block">
                LANGUAGE
              </Label>
              <RadioGroup value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <div className="space-y-3">
                  {languages.map((lang) => (
                    <div key={lang} className="flex items-center space-x-2">
                      <RadioGroupItem value={lang} id={lang} />
                      <Label
                        htmlFor={lang}
                        className="text-sm cursor-pointer hover:text-primary text-muted-foreground"
                      >
                        {lang}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Price Slider */}
            <div>
              <Label className="text-xs font-bold tracking-widest text-primary mb-4 block">
                PRICE RANGE
              </Label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
              <p className="text-sm mt-2 text-muted-foreground">
                ${priceRange[0]} – ${priceRange[1]}
              </p>
            </div>
          </div>

          {/* Main Content */}
          <main className="md:w-3/4 w-full">
            {/* Upper Filters */}
            <div className="flex items-center justify-between gap-2 mb-8 flex-nowrap overflow-x-auto min-w-0">
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48 flex-shrink-0 focus-visible:ring-primary focus-visible:border-primary"
              />

              <div className="flex items-center gap-2 flex-nowrap">
                <Button
                  variant={showFreeOnly ? "default" : "outline"}
                  onClick={() => setShowFreeOnly((prev) => !prev)}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  Free Courses
                </Button>
                <Button
                  variant={showWithCertificates ? "default" : "outline"}
                  onClick={() => setShowWithCertificates((prev) => !prev)}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  Certificates
                </Button>
                <Button
                  variant={showRecentlyAdded ? "default" : "outline"}
                  onClick={() => setShowRecentlyAdded((prev) => !prev)}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  Recently Added
                </Button>
                <Button
                  variant={showShortCourses ? "default" : "outline"}
                  onClick={() => setshowShortCourses((prev) => !prev)}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  Short Courses
                </Button>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="top">Highest Rated</SelectItem>
                    <SelectItem value="priceLow">Price: Low to High</SelectItem>
                    <SelectItem value="priceHigh">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCourses.map((course, index) => (
                <div key={index} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={course.imageSrc}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    {course.badge && (
                      <span className="inline-block bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full mb-2">
                        {course.badge}
                      </span>
                    )}
                    <h3 className="font-semibold text-card-foreground mb-2">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{course.instructor}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-muted-foreground">⭐ {course.rating}</span>
                        <span className="text-xs text-muted-foreground">({course.reviews})</span>
                      </div>
                      <span className="font-bold text-primary">{course.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}