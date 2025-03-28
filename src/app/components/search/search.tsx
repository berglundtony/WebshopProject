'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Product } from '../../types';
import { Products } from '../../actions';
import styles from './search.module.css'; 


// Debounce Utility
function debounce(myfunc: (...args: any[]) => void, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => myfunc(...args), delay);
  };
}

// Search main component
export default function Search() {
  const [userInput, setUserInput] = useState('');
  const [matchingProducts, setMatchingProducts] = useState<Product[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const debouncedProductSearch = debounce(async (query: string) => {
    
    const trimmedQuery = query.trim();
   
    if (!trimmedQuery) {
      setMatchingProducts([]);
      setIsDropdownVisible(false);
      return;
    }

    // deb-search triggered -> API fetching
    const debouncedSearch = Products.GetProductBySearch(trimmedQuery); 
    const data = await debouncedSearch.fetch(); 
    const results: Product[] = data.products || []; // 
    //making search results case insensitive
    const caseInsensitiveMatching = results.filter(p =>
      p.title.toLowerCase().includes(trimmedQuery.toLowerCase())
    );
    setMatchingProducts(caseInsensitiveMatching);
    setIsDropdownVisible(true); //
  }, 1000);



  // BBB Handler for input in the searchbox
  function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    setUserInput(inputValue);
    debouncedProductSearch(inputValue);
    if (!inputValue) {
      // Hiding the dropdown right away so closes/rerender
      setIsDropdownVisible(false);
    }
  }

  function navigateToSearchResults(query: string) {
    const trimmed = query.trim();
    const params = new URLSearchParams(searchParams.toString());
    
    if (!trimmed) {
      params.delete('q');
    } else {
      params.set('q', trimmed);
    }
    router.push(`${pathname}?${params.toString()}`);
    setIsDropdownVisible(false);
  }

// Handles routes routing/dropdown visability when needed/
  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigateToSearchResults(userInput);
  }

  // Handle dropdown-seeMoreResults
  function handleDropdownProductSelction(prod: Product) {
    router.push(`/products/${prod.id}`);
    setIsDropdownVisible(false);
  }

  // Handle dropdown-seeMoreResults
  function handleSeeMoreResults() {
    navigateToSearchResults(userInput);
  }

  return (
    
    <div className={styles.searchContainer}>
        <div className={styles.inputOuterWrapper }> 
            <div className={styles.inputInnerWrapper}>
                <form onSubmit={handleSearchSubmit} className={styles.searchbox}>
                    <input
                    type="text"
                    value={userInput}
                    onChange={handleSearchInput}
                    placeholder="Sök..."
                    className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="black" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="72" y1="72" x2="16.65" y2="16.65"></line>
                      </svg>
                    </button>
 
                </form>
            </div>
        </div>
      {isDropdownVisible && (
        <ul className={styles.dropdownContainer}>
          {matchingProducts.length > 0 ? (  
            <>  
              {matchingProducts.slice(0, 8).map(prod => (
                <li
                    className={styles.dropdownList}
                    key={prod.id}
                    onMouseDown={() => handleDropdownProductSelction(prod)}   
                >
                  {prod.title} 
                </li>
              ))}
                <li
                    className={`${styles.liveSeachItem} ${styles.seeMoreResults}`}
                    onMouseDown={handleSeeMoreResults}
                >
                <span>Visa fler resultat...</span>
              </li>
            </>
          ) : (
            <li className={styles.noResult}>No result</li>
          )}
        </ul>
      )}
    </div>
  );
}
