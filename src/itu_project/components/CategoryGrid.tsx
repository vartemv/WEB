import React, { useEffect, useState } from "react";
import Link from 'next/link';

interface CategoryGridProp {
    categories: string[];
}
  

const CategoryGrid: React.FC<CategoryGridProp> = ({categories}) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {categories.map((category) => (
            <Link 
            key={category} 
            href={`/stock/${category}`} 
            className="p-4 border rounded-lg shadow hover:bg-gray-100 cursor-pointer block"
          >
            {category}
          </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;