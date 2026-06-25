describe('Utility Functions', () => {
  describe('Environment', () => {
    it('should have access to process object', () => {
      expect(typeof process).toBe('object')
    })

    it('should have a defined NODE_ENV', () => {
      expect(process.env.NODE_ENV).toBeDefined()
    })
  })

  describe('Array Operations', () => {
    it('should filter arrays correctly', () => {
      const items = [1, 2, 3, 4, 5]
      const filtered = items.filter((n) => n > 2)
      expect(filtered).toEqual([3, 4, 5])
    })

    it('should map arrays correctly', () => {
      const items = [1, 2, 3]
      const doubled = items.map((n) => n * 2)
      expect(doubled).toEqual([2, 4, 6])
    })
  })

  describe('Object Operations', () => {
    it('should merge objects correctly', () => {
      const obj1 = { a: 1 }
      const obj2 = { b: 2 }
      const merged = { ...obj1, ...obj2 }
      expect(merged).toEqual({ a: 1, b: 2 })
    })
  })
})
