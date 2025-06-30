import React, { useState } from "react";
import {
  Box,
  Typography,
  Drawer,
  Slider,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  useMediaQuery,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const categories = [
  "Office",
  "Garden",
  "Bathroom",
  "Kitchen",
  "Kids Room",
  "Dining Room",
  "Bedroom",
  "Living Room",
];

type ProductFilterPagetype = {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  priceRange: [number, number];
  setSortOption: (value: string) => void;
  sortOption: string;
};
const ProductFilterPage = ({
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  sortOption,
  setSortOption,
}: ProductFilterPagetype) => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleCategory = (cat:string) => {
    console.log(cat,909)
    console.log(selectedCategories);

    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    console.log(selectedCategories);
  };

  const toggleSortOption = (option:string) => {
    console.log(option)
    setSortOption(sortOption === option ? "" : option);
  };


  const FilterSidebar = (
    <Box p={2} width={250}>
      <Typography variant="h6">Filter by Category</Typography>
      <FormGroup>
        {categories.map((cat) => (
          <FormControlLabel
            key={cat}
            control={
              <Checkbox
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
            }
            label={cat}
          />
        ))}
      </FormGroup>
      <Typography variant="h6" mt={2}>
        Price Range
      </Typography>
      <Slider
        value={priceRange}
        onChange={(e, newValue) => {
          setPriceRange(newValue as [number, number])
        }}
        valueLabelDisplay="auto"
        min={0}
        max={4000}
      />
      <Typography variant="h6" mt={2}>
        Sort By
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={sortOption === "high"}
              onChange={() => toggleSortOption("high")}
            />
          }
          label="Price: High to Low"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={sortOption === "low"}
              onChange={() => toggleSortOption("low")}
            />
          }
          label="Price: Low to High"
        />
      </FormGroup>
    </Box>
  );

  return (
    <Box display="flex">
      {isMobile ? (
        <>
          <Button
            onClick={() => setOpenDrawer(true)}
            startIcon={<FilterListIcon />}
            sx={{ marginLeft: "0px" }}
          >
            Filter
          </Button>

          <Drawer
            anchor="left"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
          >
            {FilterSidebar}
          </Drawer>
        </>
      ) : (
        <Box>{FilterSidebar}</Box>
      )}
    </Box>
  );
};

export default ProductFilterPage;
