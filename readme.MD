# FAQ Management System

## Overview

The FAQ Management System is a Node.js application designed to manage frequently asked questions (FAQs) in multiple languages. It features a RESTful API, caching for performance, and automated translation support.

## Features

-   **Multilingual FAQs**: Store and retrieve FAQs in various languages.
-   **Caching**: Utilize IoRedis for fast access to translations.
-   **RESTful API**: Easy integration with front-end applications.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/frustratedProton/BharatFD-Assessment
    cd BharatFD-Assessment
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables** for API keys and Redis (optional) configuration.

4. **Start the application**:
    ```bash
    npm start
    ```

## API Endpoints

### Create a New FAQ

-   **Endpoint**: `POST /faq`
-   **Request Body**:
    ```json
    {
        "question": "What is the FAQ Management System?",
        "answer": "This system allows users to manage FAQs.",
        "translations": {
            "hi": {
                "question": "FAQ प्रबंधन प्रणाली क्या है?",
                "answer": "यह प्रणाली उपयोगकर्ताओं को FAQ प्रबंधित करने की अनुमति देती है।"
            },
            "bn": {
                "question": "FAQ ব্যবস্থাপনা সিস্টেম কি?",
                "answer": "এই সিস্টেমটি ব্যবহারকারীদের FAQ পরিচালনা করতে দেয়।"
            }
        }
    }
    ```

### Retrieve FAQs

-   **Endpoint**: `GET /faq`
-   **Query Parameter**: `?lang=<language_code>` (e.g., `?lang=bn`)

## Translation Support

-   **Automated Translations**: Used [@vitalets/google-translate-api](https://www.npmjs.com/package/@vitalets/google-translate-api) for translation

## Contribution Guidelines

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Ensure code adheres to project standards.
4. Submit a pull request with a clear description of changes.

## **Example API Usage**
```bash
# Fetch FAQs in English (default)
curl http://localhost:8000/api/faqs/

# Fetch FAQs in Hindi
curl http://localhost:8000/api/faqs/?lang=hi

# Fetch FAQs in Bengali
curl http://localhost:8000/api/faqs/?lang=bn
```

--- 

> current issue:

-   getting rate limited by google translate's unofficial node_module
