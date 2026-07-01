interface AdmissionOperations {
  applyForAdmission(): void;
  payFees(): void;
}

interface Orientation {
  attendOrientation(): void;
}

interface ManageHostal {
  manageHostel(): void;
}

class UndergraduateStudent
  implements AdmissionOperations, Orientation, ManageHostal
{
  applyForAdmission(): void {
    console.log("UG Admission Applied");
  }

  payFees(): void {
    console.log("UG Fees Paid");
  }

  attendOrientation(): void {
    console.log("UG Orientation Attended");
  }

  manageHostel(): void {
    console.log("UG Hostel Allocated");
  }
}

class DistanceLearningStudent implements AdmissionOperations {
  applyForAdmission(): void {
    console.log("Distance Learning Admission Applied");
  }

  payFees(): void {
    console.log("Distance Learning Fees Paid");
  }
}

// class SqlAdmissionRepository {
//   save(studentName: string): void {
//     console.log(`Saving ${studentName} in SQL Database`);
//   }
// }

// class AdmissionService {
//   private repository = new SqlAdmissionRepository();

//   processAdmission(studentType: string, studentName: string): void {
//     if (studentType === "UG") {
//       console.log("Processing UG Admission");
//     } else if (studentType === "PG") {
//       console.log("Processing PG Admission");
//     }

//     this.repository.save(studentName);
//   }
// }

class Worker {
  writeCode(): void {
    console.log("Writing code");
  }

  testCode(): void {
    console.log("Testing code");
  }

  deployCode(): void {
    console.log("Deploying code");
  }
}

class Developer extends Worker {}

class Tester extends Worker {
  writeCode(): void {
    throw new Error("Tester doesn't write code");
  }

  deployCode(): void {
    throw new Error("Tester doesn't deploy code");
  }
}

class ProjectManager {
  private developer = new Developer();

  processRelease(): void {
    this.developer.writeCode();
    this.developer.testCode();
    this.developer.deployCode();
  }
}
