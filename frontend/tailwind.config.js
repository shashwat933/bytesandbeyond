    // @type {import('tailwindcss').Config} 
    module.exports = {
        content: [
            "./src/**/*.{js,jsx,ts,tsx}",
        ],
        theme: {
            extend: {
                colors: {
                    'mine': '#ADFF45',
                    'mine2': '#1976d2',
                    'formPlaceholder': '#808080',
                },
                width: {
                    '128': '70rem',
                    'size1': '30rem',
                    'size2':'19rem'




                },
                height: {
                    'sizeOfBlog': '10rem',
                    'sizeOfImage': '20rem',

                },
                screens: {
                    'md2': '810px',
                    'sm2': '400px',
                    'laptop': '1200px',
                    'mobile1': { 'max': '1200px' },
                    'mobile2': { 'max': '600px' },

                },
            },
        },
        plugins: [],
    }
