// Storage service for persisting user data
export class StorageService {
  static STORAGE_KEY = 'power-bill-planner-data'

  /**
   * Save user inputs to localStorage
   * @param {Object} data - The user input data to save
   */
  static saveData(data) {
    try {
      const dataToSave = {
        ...data,
        lastSaved: new Date().toISOString()
      }
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dataToSave))
      return true
    } catch (error) {
      console.error('Failed to save data:', error)
      return false
    }
  }

  /**
   * Load user inputs from localStorage
   * @returns {Object|null} The saved data or null if not found
   */
  static loadData() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY)
      if (saved) {
        const data = JSON.parse(saved)
        // Remove the lastSaved timestamp before returning
        const { lastSaved, ...userData } = data
        return userData
      }
      return null
    } catch (error) {
      console.error('Failed to load data:', error)
      return null
    }
  }

  /**
   * Clear saved data from localStorage
   */
  static clearData() {
    try {
      localStorage.removeItem(this.STORAGE_KEY)
      return true
    } catch (error) {
      console.error('Failed to clear data:', error)
      return false
    }
  }

  /**
   * Check if there is saved data
   * @returns {boolean} True if saved data exists
   */
  static hasSavedData() {
    return localStorage.getItem(this.STORAGE_KEY) !== null
  }

  /**
   * Get the last saved timestamp
   * @returns {string|null} ISO timestamp string or null
   */
  static getLastSavedTime() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY)
      if (saved) {
        const data = JSON.parse(saved)
        return data.lastSaved
      }
      return null
    } catch (error) {
      console.error('Failed to get last saved time:', error)
      return null
    }
  }
}
