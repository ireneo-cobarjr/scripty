export const appUsers = [
  {
    id: 1,
    username: "Jody",
    password: "password",
  },

  {
    id: 2,
    username: "Jimmy",
    password: "password",
  },
];

export const scripties = [
  {
    id: 1,
    userId: 1,
    title: "console.log",
    description: "Prints 123",
    code: "console.log(123);",
    evaluation: {
      correctness:
        "description confirms that the code prints 123, and the code prints 123",
      performance: {
        time: "O(1)",
        space: "O(1)",
        eval: "The code simply logs a constant value to the console, which takes constant time and space complexity. The code is simple and efficient.",
        rating: 5,
      },
    },
  },
];
