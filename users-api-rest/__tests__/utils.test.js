const { validateBodyRequest } = require('../src/utils')

test('correct object validation (well formed object)', () => {
    const objCorrect = {
        description: 'User description with Lorem ipsum',
        first_name: 'Romer',
        last_name: 'Maldonado',
        profile_image_url: 'https://test-image-url-zemoga.com/image.jpg',
    }

    expect(validateBodyRequest(objCorrect)).toBe(true)
})

test('correct object validation (wrong formed object)', () => {
    const objCorrect = {
        description: null,
        first_name: '',
        last_name: '',
        profile_image_url: 'https://test-image-url-zemoga.com/image.jpg',
    }

    expect(validateBodyRequest(objCorrect)).toBe(false)
})
