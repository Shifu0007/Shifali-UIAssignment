const mockData = [
  { customerId: 1, amount: 120, date: "2024-01-15" },
  { customerId: 1, amount: 80, date: "2024-01-20" },
  { customerId: 1, amount: 50, date: "2024-01-25" },
  { customerId: 1, amount: 220, date: "2024-02-10" },
  { customerId: 2, amount: 150, date: "2024-01-10" },
  { customerId: 2, amount: 90, date: "2024-01-18" },
  { customerId: 2, amount: 200, date: "2024-01-30" },
  { customerId: 2, amount: 75, date: "2024-02-15" },
  { customerId: 3, amount: 300, date: "2024-02-05" },
  { customerId: 3, amount: 50, date: "2024-02-12" },
  { customerId: 3, amount: 40, date: "2024-03-01" },
  { customerId: 4, amount: 180, date: "2024-03-10" },
  { customerId: 4, amount: 120, date: "2024-03-15" },
  { customerId: 4, amount: 200, date: "2024-03-20" },
];
  
  /**
   * Simulates an API call to fetch transactions
   * @returns {Promise<Array>} A promise that resolves to an array of transaction objects
   */
  export const fetchTransactions = async () => {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockData);
        }, 1000);
      });
    } catch (error) {
      throw new Error("Failed to fetch transactions");
    }
  };
  