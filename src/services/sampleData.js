// Preset realistic syllabi for zero-friction judging and instant demonstrations
export const SAMPLE_SYLLABI = [
  {
    id: 'cs101',
    name: 'CS 301: Data Structures & Algorithms',
    code: 'CS301',
    instructor: 'Dr. Alex Vance',
    term: 'Fall Semester',
    text: `COURSE SYLLABUS: CS 301 - Data Structures and Algorithms
Term: Fall 2026 | Credits: 4.0 | Instructor: Dr. Alex Vance
Office Hours: Tue/Thu 3:00 PM - 5:00 PM (Room CS-402)

GRADING CRITERIA:
- 4 Programming Assignments: 30% (7.5% each)
- 2 Lab Practicals: 15%
- Midterm Examination: 25%
- Final Term Project: 30%

SCHEDULE & CRITICAL DEADLINES:
1. Programming Assignment 1: Recursion & Complexity Analysis
   - Due Date: October 4, 2026 at 11:59 PM
   - Weight: 7.5% | Estimated Time: 10 hours
   - Details: Implement recursive divide-and-conquer algorithms with asymptotic complexity proofs.

2. Lab Practical 1: Linked Lists, Stacks & Queues
   - Due Date: October 18, 2026 at 5:00 PM
   - Weight: 7.5% | Estimated Time: 6 hours
   - Details: In-lab timed coding test covering dynamic memory and list manipulation.

3. Programming Assignment 2: Balanced Search Trees (AVL & Red-Black)
   - Due Date: November 1, 2026 at 11:59 PM
   - Weight: 7.5% | Estimated Time: 14 hours
   - Details: Implement self-balancing tree rotation algorithms and benchmark lookup times.

4. Midterm Examination (Comprehensive)
   - Date: November 12, 2026 from 10:00 AM - 12:30 PM
   - Weight: 25% | Estimated Prep Time: 25 hours
   - Details: Covers Modules 1-4 (Complexity, Linked Structures, Trees, Hashing, Graph Traversals).

5. Programming Assignment 3: Dijkstra & Minimum Spanning Trees
   - Due Date: November 24, 2026 at 11:59 PM
   - Weight: 7.5% | Estimated Time: 12 hours
   - Details: Graph modeling of real-world transit routing networks.

6. Final Capstone Project: High-Performance Cache & Index Engine
   - Due Date: December 10, 2026 at 11:59 PM
   - Weight: 30% | Estimated Time: 35 hours
   - Details: End-to-end memory-mapped KV store with concurrent read/write locks, LRU eviction, and benchmark report.

Late Policy: 10% penalty per day up to 3 days. No submissions accepted after 72 hours without prior dean excuse.`
  },
  {
    id: 'ai502',
    name: 'AI 502: Deep Learning & Neural Networks',
    code: 'AI502',
    instructor: 'Prof. Maya Lin',
    term: 'Fall 2026',
    text: `AI 502: Advanced Deep Learning Systems
Instructor: Prof. Maya Lin
Assessment Breakdown:
- Bi-weekly Problem Sets (4): 20%
- PyTorch Research Paper Replication: 25%
- Midterm Quiz (Online): 15%
- Final Project & Poster Presentation: 40%

Key Course Milestones:
- Assignment 1: Backpropagation from Scratch & Tensor Ops (Due: October 8, 2026 - 11:59 PM | 5%)
- Assignment 2: CNN Architectures & Vision Transformers (Due: October 22, 2026 - 11:59 PM | 5%)
- Midterm Assessment (Online Proctored): November 5, 2026 - 2:00 PM | 15%
- Paper Reproduction Milestone: Code & Preliminary Checkpoint (Due: November 19, 2026 - 11:59 PM | 10%)
- Assignment 3: Attention Mechanisms & LLM Fine-Tuning (Due: December 3, 2026 - 11:59 PM | 10%)
- Final Deep Learning Project Code & Poster Presentation: December 16, 2026 - 4:00 PM | 30%`
  },
  {
    id: 'web204',
    name: 'CS 204: Full Stack Web Engineering',
    code: 'CS204',
    instructor: 'Dr. Kevin Zhao',
    term: 'Fall 2026',
    text: `CS 204 Full Stack Web Engineering - Course Roadmap
Instructor: Dr. Kevin Zhao | Term: Fall 2026

Evaluation Scheme:
- Sprint 1 (Responsive Frontend & UI/UX): Due Oct 6, 2026 (15%)
- Sprint 2 (RESTful API & Database Architecture): Due Oct 27, 2026 (20%)
- Midterm Code Review & Security Audit: Nov 10, 2026 (15%)
- Sprint 3 (Authentication, WebSockets & CI/CD): Nov 28, 2026 (20%)
- Final Production Deployment & Live Demo: Dec 12, 2026 (30%)`
  }
];

// High quality fallback structured results for instant testing / zero API key required
export const FALLBACK_EXTRACTION = {
  courseName: "CS 301: Data Structures & Algorithms",
  courseCode: "CS301",
  instructor: "Dr. Alex Vance",
  term: "Fall Semester 2026",
  totalAssignments: 6,
  totalWorkloadHours: 102,
  summary: "Comprehensive 4-credit course covering algorithm design, asymptotic analysis, advanced tree/graph structures, and high-performance system engineering.",
  assignments: [
    {
      id: "asgn-1",
      title: "Prog Asgn 1: Recursion & Complexity Analysis",
      type: "Assignment",
      dueDate: "2026-10-04T23:59:00",
      weight: 7.5,
      estimatedHours: 10,
      urgency: "Medium",
      description: "Implement recursive divide-and-conquer algorithms with asymptotic complexity proofs.",
      milestones: [
        { id: "m-1-1", title: "Review Master Theorem & Recurrence relations", hours: 2, completed: false },
        { id: "m-1-2", title: "Implement Divide-and-Conquer test cases", hours: 4, completed: false },
        { id: "m-1-3", title: "Run benchmark suite & write formal proof report", hours: 4, completed: false }
      ]
    },
    {
      id: "asgn-2",
      title: "Lab Practical 1: Linked Lists, Stacks & Queues",
      type: "Lab",
      dueDate: "2026-10-18T17:00:00",
      weight: 7.5,
      estimatedHours: 6,
      urgency: "Medium",
      description: "In-lab timed coding test covering dynamic memory and list manipulation.",
      milestones: [
        { id: "m-2-1", title: "Practice dynamic memory pointer manipulations", hours: 2, completed: false },
        { id: "m-2-2", title: "Solve 5 mock stack/queue leetcode problems", hours: 4, completed: false }
      ]
    },
    {
      id: "asgn-3",
      title: "Prog Asgn 2: Balanced Search Trees (AVL & Red-Black)",
      type: "Assignment",
      dueDate: "2026-11-01T23:59:00",
      weight: 7.5,
      estimatedHours: 14,
      urgency: "High",
      description: "Implement self-balancing tree rotation algorithms and benchmark lookup times.",
      milestones: [
        { id: "m-3-1", title: "Implement BST insertion, deletion & traversal", hours: 3, completed: false },
        { id: "m-3-2", title: "Implement left/right rotations and AVL height updates", hours: 6, completed: false },
        { id: "m-3-3", title: "Benchmark search latency vs unbalanced BST", hours: 5, completed: false }
      ]
    },
    {
      id: "asgn-4",
      title: "Midterm Examination (Comprehensive)",
      type: "Exam",
      dueDate: "2026-11-12T10:00:00",
      weight: 25.0,
      estimatedHours: 25,
      urgency: "Critical",
      description: "Covers Modules 1-4 (Complexity, Linked Structures, Trees, Hashing, Graph Traversals).",
      milestones: [
        { id: "m-4-1", title: "Complete Module 1-2 Concept Cheat Sheet", hours: 6, completed: false },
        { id: "m-4-2", title: "Solve Past 3 Years Midterm Papers", hours: 10, completed: false },
        { id: "m-4-3", title: "Timed Mock Exam simulation with friend", hours: 5, completed: false },
        { id: "m-4-4", title: "Final Formula & Edge-case review", hours: 4, completed: false }
      ]
    },
    {
      id: "asgn-5",
      title: "Prog Asgn 3: Dijkstra & Minimum Spanning Trees",
      type: "Assignment",
      dueDate: "2026-11-24T23:59:00",
      weight: 7.5,
      estimatedHours: 12,
      urgency: "Medium",
      description: "Graph modeling of real-world transit routing networks.",
      milestones: [
        { id: "m-5-1", title: "Graph Adjacency List & Priority Queue setup", hours: 3, completed: false },
        { id: "m-5-2", title: "Implement Dijkstra shortest path algorithm", hours: 5, completed: false },
        { id: "m-5-3", title: "Implement Prim/Kruskal MST & transit dataset tests", hours: 4, completed: false }
      ]
    },
    {
      id: "asgn-6",
      title: "Final Capstone Project: High-Performance Cache Engine",
      type: "Project",
      dueDate: "2026-12-10T23:59:00",
      weight: 30.0,
      estimatedHours: 35,
      urgency: "Critical",
      description: "End-to-end memory-mapped KV store with concurrent read/write locks, LRU eviction, and benchmark report.",
      milestones: [
        { id: "m-6-1", title: "Architecture Design & Concurrent Hash Table", hours: 8, completed: false },
        { id: "m-6-2", title: "Implement Thread-safe LRU Eviction Policy", hours: 10, completed: false },
        { id: "m-6-3", title: "Write High-throughput Stress Test Suite", hours: 9, completed: false },
        { id: "m-6-4", title: "Final Documentation, Video Demo & GitHub Submission", hours: 8, completed: false }
      ]
    }
  ],
  studyPlan: [
    {
      weekNumber: 1,
      theme: "Foundation & Algorithmic Complexity",
      focusItems: ["Asgn 1 Divide & Conquer", "Master Theorem"],
      targetHours: 10,
      tasks: [
        { day: "Monday", activity: "Read chapters 1-2 & derive recurrence proofs", duration: "2h" },
        { day: "Wednesday", activity: "Code Divide & Conquer prototype in C++/Java", duration: "4h" },
        { day: "Saturday", activity: "Run benchmarks and finalize Assignment 1 submission", duration: "4h" }
      ]
    },
    {
      weekNumber: 2,
      theme: "Dynamic Memory & Practical Lab Prep",
      focusItems: ["Lab 1 Timed Mock Coding", "Memory Leaks"],
      targetHours: 8,
      tasks: [
        { day: "Tuesday", activity: "Review pointer arithmetic and double linked lists", duration: "3h" },
        { day: "Thursday", activity: "Simulate 45-minute timed coding scenario", duration: "3h" },
        { day: "Sunday", activity: "Lab practical buffer & review", duration: "2h" }
      ]
    },
    {
      weekNumber: 3,
      theme: "Self-Balancing Trees & Rotations",
      focusItems: ["AVL Tree Insertions", "Red-Black Invariants"],
      targetHours: 14,
      tasks: [
        { day: "Tuesday", activity: "Implement AVL Left/Right Tree Rotations", duration: "5h" },
        { day: "Thursday", activity: "Debug rebalance height triggers & edge cases", duration: "5h" },
        { day: "Saturday", activity: "Latency benchmarking against raw BST", duration: "4h" }
      ]
    },
    {
      weekNumber: 4,
      theme: "Midterm Intensive Sprint",
      focusItems: ["Past Exam Papers", "Timed Simulation"],
      targetHours: 20,
      tasks: [
        { day: "Monday-Wednesday", activity: "Deep dive past 3 years midterm questions", duration: "10h" },
        { day: "Thursday-Friday", activity: "Identify weak spots in Graph & Hash table proofs", duration: "6h" },
        { day: "Saturday", activity: "Full mock exam under 2.5 hour strict timer", duration: "4h" }
      ]
    },
    {
      weekNumber: 5,
      theme: "Graph Algorithms & Routing",
      focusItems: ["Dijkstra Shortest Path", "Kruskal MST"],
      targetHours: 12,
      tasks: [
        { day: "Wednesday", activity: "Build Graph Adjacency representation", duration: "4h" },
        { day: "Friday", activity: "Integrate Min-Heap Priority Queue for Dijkstra", duration: "4h" },
        { day: "Sunday", activity: "Test with transit dataset & verify output", duration: "4h" }
      ]
    },
    {
      weekNumber: 6,
      theme: "Final Capstone Sprint & Delivery",
      focusItems: ["Concurrent KV Store", "Stress Testing", "Submission"],
      targetHours: 30,
      tasks: [
        { day: "Days 1-3", activity: "Core Cache Engine & Concurrency Locking", duration: "12h" },
        { day: "Days 4-5", activity: "LRU Eviction & Benchmarking", duration: "10h" },
        { day: "Days 6-7", activity: "Final Report, Performance Graphs & Video", duration: "8h" }
      ]
    }
  ]
};
