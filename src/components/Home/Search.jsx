import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
    {
        category: 'Home Services',
        subcategories: [
            'Plumbing',
            'Electrical',
            'Carpentry',
            'Cleaning',
            'Painting',
            'Appliance Repair',
            'Pest Control',
        ],
    },
    {
        category: 'Delivery Services',
        subcategories: [
            'Food Delivery',
            'Parcel Delivery',
            'Furniture Moving',
            'Document Courier',
            'Grocery Delivery',
            'Medicine Delivery',
            'Gift Delivery',
            'E-commerce Package Delivery',
        ],
    },
    {
        category: 'Handyman Services',
        subcategories: [
            'TV Mounting',
            'Furniture Assembly',
            'Appliance Installation',
            'Door Repair',
            'Window Repair',
            'Faucet Installation',
            'Ceiling Fan Installation',
            'Cabinet Installation',
        ],
    },
    {
        category: 'Personal Assistance',
        subcategories: [
            'Errands',
            'Grocery Shopping',
            'Pet Sitting',
            'Event Planning',
            'Travel Arrangements',
            'Personal Shopping',
            'Virtual Assistant',
            'Laundry Services',
        ],
    },
    {
        category: 'Beauty & Wellness',
        subcategories: [
            'Haircuts & Styling',
            'Facial Treatments',
            'Massage Therapy',
            'Nail Services',
            'Makeup Services',
            'Yoga Instruction',
            'Personal Training',
            'Skin Care Treatments',
        ],
    },
];

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const suggestionsRef = useRef(null); // Create a ref for the suggestions dropdown
    const searchInputRef = useRef(null); // Create a ref for the search input field
    const navigate = useNavigate();

    // Flatten the categories into a list of all subcategories
    const allServices = categories.flatMap((cat) =>
        cat.subcategories.map((sub) => ({
            title: sub,
            category: cat.category,
        }))
    );

    // Handle search input change
    const handleInputChange = (e) => {
        const value = e.target.value.trimStart(); // Avoid leading spaces
        setSearchTerm(value);

        if (value) {
            // Filter services based on title or category
            const filtered = allServices.filter((service) =>
                service.title.toLowerCase().includes(value.toLowerCase()) ||
                (service.category && service.category.toLowerCase().includes(value.toLowerCase()))
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]); // Clear suggestions if input is empty
        }

        // Reset selected index when input changes
        setSelectedIndex(-1);
    };

    // Handle key navigation
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setSelectedIndex((prevIndex) =>
                prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
            );
        } else if (e.key === 'ArrowUp') {
            setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
        } else if (e.key === 'Enter') {
            if (selectedIndex >= 0) {
                const selectedSuggestion = suggestions[selectedIndex];
                setSearchTerm(selectedSuggestion.title);
                console.log(`Selected suggestion: ${selectedSuggestion.title}`);
                setSuggestions([]); // Clear suggestions after selection
                handleSearch(); // Perform the search with the selected term
            }
        } else if (e.key === 'Backspace') {
            // Reset selectedIndex on backspace to avoid auto-completing with previous selections
            setSelectedIndex(-1);
        }
    };

    // Handle search action
    const handleSearch = () => {
        if (searchTerm.trim()) {
            console.log(`Searching for: ${searchTerm}`);
            // onSearch(searchTerm); // Pass search term to parent or navigate
            navigate(`/available-services?query=${encodeURIComponent(searchTerm)}`);
            setSuggestions([]);
        } else {
            console.log('Please enter a search term');
        }
    };

    // Scroll the suggestion list to the selected item
    useEffect(() => {
        if (suggestionsRef.current && selectedIndex >= 0 && selectedIndex < suggestions.length) {
            const selectedItem = suggestionsRef.current.children[selectedIndex];
            if (selectedItem) {
                selectedItem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest', // Adjust this for the smoothest scrolling
                });
            }
        }
    }, [selectedIndex, suggestions]);

    // Update input when navigating suggestions
    useEffect(() => {
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
            setSearchTerm(suggestions[selectedIndex].title);
        }
    }, [selectedIndex, suggestions]);

    // Close suggestions when clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target) &&
                !searchInputRef.current.contains(event.target)
            ) {
                setSuggestions([]); // Close suggestions
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle mouse hover to select suggestion
    const handleMouseEnter = (index) => {
        setSelectedIndex(index);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.title); // Fill input with suggestion
        setSuggestions([]); // Clear suggestions after selection
        handleSearch(); // Trigger search with selected suggestion
    };

    return (
        <div className="search-bar-container text-center my-4">
            {/* Heading */}
            <h2
                className="mb-4"
                style={{
                    fontSize: '2.5rem',
                    color: '#31465a',
                    fontWeight: '600',
                    lineHeight: '1.4',
                    letterSpacing: '0.5px',
                }}
            >
                <span style={{ color: '#2980B9' }}>Find</span> the{' '}
                <span style={{ color: '#8E44AD' }}>Services</span> You{' '}
                <span style={{ color: '#E74C3C' }}>Need</span>
            </h2>

            {/* Additional Text */}
            <p
                style={{
                    fontSize: '1.1rem',
                    color: '#646f71',
                    maxWidth: '800px',
                    margin: '0 auto',
                    fontWeight: '400',
                    marginBottom: '30px',
                }}
            >
                Whether you&#39;re looking for plumbing, electrical work, delivery services, or
                anything else, use the search bar below to find the services you need in an instant.
            </p>

            {/* Search Bar */}
            <div className="input-group mb-3 w-50 mx-auto position-relative">
                <input
                    ref={searchInputRef} // Set ref to the input field
                    type="text"
                    className="form-control mx-3 border-2"
                    placeholder="Search for services..."
                    aria-label="Search for services"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    style={{
                        fontSize: '1rem',
                        borderRadius: '50px',
                        zIndex: 1, // Ensures input stays above the dropdown
                        padding: '10px',
                    }}
                />
                {/* Suggestions Dropdown */}
                {suggestions.length > 0 && (
                    <ul
                        ref={suggestionsRef} // Set ref to the dropdown list
                        className="list-group position-absolute w-100 mt-2"
                        style={{
                            zIndex: 1000,
                            maxHeight: '200px',
                            overflowY: 'auto',
                            backgroundColor: 'white',
                            borderRadius: '10px',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            top: 'calc(100% + 10px)', // Push the dropdown slightly below the input
                        }}
                    >
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className={`list-group-item d-flex justify-content-between align-items-center ${
                                    index === selectedIndex ? 'active' : ''
                                }`}
                                style={{
                                    cursor: 'pointer',
                                    padding: '10px',
                                    backgroundColor: index === selectedIndex ? '#007bff' : '',
                                    color: index === selectedIndex ? 'white' : 'black',
                                }}
                                onMouseDown={() => handleSuggestionClick(suggestion)}
                                onMouseEnter={() => handleMouseEnter(index)} // Handle mouse hover
                            >
                                {suggestion.title}{' '}
                                <small
                                    style={{
                                        fontStyle: 'italic',
                                        color: index === selectedIndex ? 'white' : '#646f71',
                                    }}
                                >
                                    ({suggestion.category})
                                </small>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Search;
