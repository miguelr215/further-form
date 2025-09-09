-- 1
SELECT 
    a.id AS author_id,
    a.first_name,
    a.last_name,
    c.name AS country_name,
    b.title AS book_title,
    b.isbn,
    bd.price,
    bd.discount,
    bd.is_hard_copy
FROM 
    author a
LEFT JOIN 
    country c ON a.country_id = c.id
LEFT JOIN 
    book b ON a.id = b.author_id
LEFT JOIN 
    bookdetails bd ON b.id = bd.book_id
ORDER BY 
    a.last_name, 
    a.first_name;

-- 2
SELECT a.id, a.first_name, a.last_name, c.name AS country_name
FROM author a
JOIN country c ON a.country_id = c.id
WHERE c.code = 'USA';

-- 3
SELECT 
    a.id AS author_id,
    a.first_name,
    a.last_name,
    c.name AS country_name,
    COUNT(b.id) AS number_of_books
FROM 
    author a
JOIN 
    country c ON a.country_id = c.id
JOIN 
    book b ON a.id = b.author_id
GROUP BY 
    a.id, a.first_name, a.last_name, c.name
ORDER BY 
    number_of_books DESC;

-- 4
SELECT 
    COUNT(b.id) AS number_of_books_from_usa
FROM 
    author a
JOIN 
    country c ON a.country_id = c.id
JOIN 
    book b ON a.id = b.author_id
WHERE 
    c.code = 'USA';

-- 5
SELECT 
    b.title,
    b.isbn,
    bd.discount,
    bd.price
FROM 
    book b
JOIN 
    bookdetails bd ON b.id = bd.book_id
WHERE 
    bd.discount BETWEEN 20 AND 30
ORDER BY 
    bd.price ASC;

-- 6
SELECT 
    a.first_name,
    a.last_name,
    COALESCE(MIN(bd.price), -1) AS lowest_book_price
FROM 
    author a
LEFT JOIN 
    book b ON a.id = b.author_id
LEFT JOIN 
    bookdetails bd ON b.id = bd.book_id
GROUP BY 
    a.id, a.first_name, a.last_name
ORDER BY 
    a.last_name, a.first_name;
