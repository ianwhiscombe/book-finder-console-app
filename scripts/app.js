
const { log } = console;

// Class with constructor to create book instances.

class Book {
    // ! Q1 In video B at 4:22, you use destructuring assignment here, why? I can't work out what that gives you versus just setting named parameters as on line below. Is it because it allows you to set parameters that might not initally receive values?
    constructor(title, author, genre, location, rating = 'Not read') {

        log('Passed arguments testing:', arguments); 

        if (!title) {
            throw new Error(`No book title provided, received: ${title}`);
        }
        if (typeof title !== 'string') {
            throw new Error(`Title should be a string, received: ${title}`);
        }
        this.title = title;

        if (!author) {
            throw new Error(`No author name provided, received: ${author}`);
        }
        if (typeof author !== 'string') {
            throw new Error(`Author name should be a string, received: ${author}`);
        }
        this.author = author;

        if (!genre) {
            throw new Error(`No genre provided, received: ${genre}`);
        }
        if (typeof genre !== 'string') {
            throw new Error(`Genre should be a string, received: ${genre}`);
        }
        this.genre = genre;

        if (!location) {
            throw new Error(`No location provided, received: ${location}`);
        }
        if (typeof location !== 'string') {
            throw new Error(`Location should be a string, received: ${location}`);
        }
        this.location = location;

        if (
            typeof rating !== "number" &&
            rating != null &&
            typeof rating !== "undefined") {
            throw new Error(
                `Rating should be a number from 0 to 5 or null, received: ${rating}`
            );
        }
        this.rating = rating;
        // ! Q2 You did this bit for me, I can't work out what it and the other hasBeenRead are doing.
        this.hasBeenRead = rating != null;
    }
}

// Constructor class that creates an instance of the book finder app and contains methods to create, read, update and delete book instances.

class BookFinderApp {
    constructor(libraryDataArray) {
        if (!libraryDataArray) {
            throw new Error(`No library provided, received: ${library}`);
        }
        if (!Array.isArray(libraryDataArray)) {
            throw new Error(`Library must be an array, received: ${library}`);
        }
        this.library = [];

        for (const bookData of libraryDataArray) {
            this.library.push(new Book(
                bookData.title,
                bookData.author,
                bookData.genre,
                bookData.location,
                bookData.rating
            ));
        }
    };

    // CRUD methods (create, read, update, delete)

    // Add (create) a book. 

    addBook(bookData) {
        if(!bookData) {
            throw new Error(`No data provided to addBook, received: ${bookData}`);
        }
        const newBook = new Book(
            bookData.title,
            bookData.author,
            bookData.genre,
            bookData.location,
            bookData.rating
        );
        this.library.push(newBook);
        return newBook;
    }

    // Find (read) a book (reveals book's location)

    // get the index of the book that exists with supplied title.
    getBookIndex(title) {
        if (!title) {
            throw new Error(`No book title provided, received: ${title}`);
        }
        if (typeof title !== 'string') {
            throw new Error(`The book title provided to getBookIndex should be a string, received: ${title}`);
        }
        const index = this.library.findIndex((book) => {
            return book.title === title;
        }); 
        if (!~index) {
            log(`Book with title of ${title} was not found`);
        }
        return index;
    }

    // find specific book using title to search.
    getBook(title) {
        const index = this.getBookIndex(title);
        if (!~index) {
            return null;
        }
        const targetBook = this.library[index];
        return targetBook;
    }

    // Amend (update) a book's rating or location.

    updateBook(title, field, value) {
        if (!field) {
            throw new Error(`A field to amend must be provided to updateBook, received: ${field}`);         
        }
        if (field === 'location' && typeof value !== 'string') {
            throw new Error(`Location must be a string, received: ${location}`);
        }
        if (field === 'rating' && typeof field === 'number' && !targetBook.hasBeenRead) {
            targetBook.hasBeenRead = true;
        }
        if (field === 'title' || field === 'author' || field === 'genre') {
            throw new Error(`You cannot change the ${field} of a book.`);
        }
        if (!value) {
            throw new Error(`A value must be provided to update any fields. Received: ${value}`);
        }

        const targetBook = this.getBook(title);
        
        if (!targetBook) {
            throw new Error(`Book not found, received ${title}`);
        }
        targetBook[field] = value;
        return targetBook;
    }

    // Remove (delete) a book from the library.

    removeBook(title) {
        if (!title) {
            throw new Error(`No book title provided, received: ${title}`);
        }
        
        const index = this.getBookIndex(title)

        if (!~index) {
            throw new Error(`Book title not found, received: ${title}`);
        }

        return this.library.splice(index, 1);
    }
}

// Initial data (an array containing book objects).

const books = [
    {
        title: 'I am Legend',
        author: 'Richard Matheson',
        genre: 'horror',
        location: 'top floor, bottom right shelf',
        rating: 5
    },
    {
        title: 'Game of Thrones',
        author: 'George RR Martin',
        genre: 'fantasy',
        location: 'top floor, middle shelf',
        rating: 4
    },
    {
        title: 'The Pragmatic Programmer',
        author: 'David Thomas & Andrew Hunt',
        genre: 'education',
        location: 'study',
        rating: 4
    },
    {
        title: 'Take Your Eye Off the Ball',
        author: 'Pat Kirwan',
        genre: 'sport',
        location: 'landing, left shelf',
        rating: 5
    },
    {
        title: 'Bring Up the Bodies',
        author: 'Hilary Mantel',
        genre: 'historical fiction',
        location: 'lounge',
        rating: 3
    }
];

// Console Testing

log('Initial Books Array:', books);

const myBookFinderApp = new BookFinderApp(books);
log('Instance of BookFinder class:', myBookFinderApp);

// Testing each of the CRUD methods inside BookFinderApp

// Search for a book by title
const gameOfThrones = myBookFinderApp.getBook('Game of Thrones');
log("Search by title:", gameOfThrones);
// Find location of book
log("Location of gameOfThrones:", gameOfThrones.location);
// Try/catch block testing what happens if I call getBook with no title.
try {
    const bad = myBookFinderApp.getBook();
} catch (err) {
    log('Catch error test on getBook:', err);
};

// Add a new book

const newBookData = {
    title: 'You Don\'t Know JavaScript',
    author: 'Kyle Simpson',
    genre: 'education',
    location: 'study',
    rating: 4, 
};

const newBook = myBookFinderApp.addBook(newBookData);
log("Add a new book:", newBook);
// Try/catch block testing what happens if I call addBook with no data from newBookData to pass to it.
try {
    const bad = myBookFinderApp.addBook();
} catch (err) {
    log('Catch error test on addBook', err);
};
// Check new book has been correctly added to the library array.
log("Check new book has been added:", myBookFinderApp.library);
// search for my newly added book
const ydkjs = myBookFinderApp.getBook("You Don't Know JavaScript");
log("Search for new book using title:", ydkjs);
log("Find new book's location:", ydkjs.location);

// Delete an existing book. 

const deleteThis = myBookFinderApp.removeBook('The Pragmatic Programmer');
log("Delete book using title:", deleteThis);
// check selected book has been deleted from library array.
log("Check deleted book has been removed:", myBookFinderApp.library);
// Try/catch block testing what happens if I call removeBook with no title.
try {
    const bad = myBookFinderApp.removeBook();
} catch (err) {
    log('Catch error test on removeBook', err);
};

// Update an existing book's location/rating.

const targetBook = myBookFinderApp.updateBook("You Don't Know JavaScript", "location", "lounge");
log("Update location of book:", targetBook)
const targetBook2 = myBookFinderApp.updateBook("You Don't Know JavaScript", "rating", 2);
log("Update rating of book:", targetBook2)



