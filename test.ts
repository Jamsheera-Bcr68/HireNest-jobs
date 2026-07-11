// // interface AdmissionOperations {
// //   applyForAdmission(): void;
// //   payFees(): void;
// // }

// // interface Orientation {
// //   attendOrientation(): void;
// // }

// // interface ManageHostal {
// //   manageHostel(): void;
// // }

// // class UndergraduateStudent
// //   implements AdmissionOperations, Orientation, ManageHostal
// // {
// //   applyForAdmission(): void {
// //     console.log("UG Admission Applied");
// //   }

// //   payFees(): void {
// //     console.log("UG Fees Paid");
// //   }

// //   attendOrientation(): void {
// //     console.log("UG Orientation Attended");
// //   }

// //   manageHostel(): void {
// //     console.log("UG Hostel Allocated");
// //   }
// // }

// // class DistanceLearningStudent implements AdmissionOperations {
// //   applyForAdmission(): void {
// //     console.log("Distance Learning Admission Applied");
// //   }

// //   payFees(): void {
// //     console.log("Distance Learning Fees Paid");
// //   }
// // }

// // // class SqlAdmissionRepository {
// // //   save(studentName: string): void {
// // //     console.log(`Saving ${studentName} in SQL Database`);
// // //   }
// // // }

// // // class AdmissionService {
// // //   private repository = new SqlAdmissionRepository();

// // //   processAdmission(studentType: string, studentName: string): void {
// // //     if (studentType === "UG") {
// // //       console.log("Processing UG Admission");
// // //     } else if (studentType === "PG") {
// // //       console.log("Processing PG Admission");
// // //     }

// // //     this.repository.save(studentName);
// // //   }
// // // }

// // class Worker {
// //   writeCode(): void {
// //     console.log("Writing code");
// //   }

// //   testCode(): void {
// //     console.log("Testing code");
// //   }

// //   deployCode(): void {
// //     console.log("Deploying code");
// //   }
// // }

// // class Developer extends Worker {}

// // class Tester extends Worker {
// //   writeCode(): void {
// //     throw new Error("Tester doesn't write code");
// //   }

// //   deployCode(): void {
// //     throw new Error("Tester doesn't deploy code");
// //   }
// // }

// // class ProjectManager {
// //   private developer = new Developer();

// //   processRelease(): void {
// //     this.developer.writeCode();
// //     this.developer.testCode();
// //     this.developer.deployCode();
// //   }
// // }

// // interface AdmissionOperations {
// //   applyForAdmission(): void;
// //   payFees(): void;
// // }
// // interface IHostalManagement {
// //   manageHostel(): void;
// // }
// // interface IOrientation {
// //   attendOrientation(): void;
// // }

// // class UndergraduateStudent
// //   implements AdmissionOperations, IHostalManagement, IOrientation
// // {
// //   applyForAdmission(): void {
// //     console.log("UG Admission Applied");
// //   }

// //   payFees(): void {
// //     console.log("UG Fees Paid");
// //   }

// //   attendOrientation(): void {
// //     console.log("UG Orientation Attended");
// //   }

// //   manageHostel(): void {
// //     console.log("UG Hostel Allocated");
// //   }
// // }

// // class DistanceLearningStudent implements AdmissionOperations {
// //   applyForAdmission(): void {
// //     console.log("Distance Learning Admission Applied");
// //   }

// //   payFees(): void {
// //     console.log("Distance Learning Fees Paid");
// //   }
// // }

// // class SqlAdmissionRepository implements IAdmissionRepository {
// //   save(studentName: string): void {
// //     console.log(`Saving ${studentName} in SQL Database`);
// //   }
// // }
// // interface IAdmissionRepository {
// //   save(studentName: string): void;
// // }

// // interface IAdminService {
// //   process(studentName: string): void;
// // }

// // class UGAdmissionService implements IAdminService {
// //   constructor(private AdRepository: IAdmissionRepository) {}

// //   process(studentName: string): void {
// //     console.log("Processing UG Admission");
// //     this.AdRepository.save(studentName);
// //   }
// // }
// // class PGAdmissionService implements IAdminService {
// //   constructor(private AdRepository: IAdmissionRepository) {}

// //   process(studentName: string): void {
// //     console.log("Processing PG Admission");
// //     this.AdRepository.save(studentName);
// //   }
// // }

// // const sqlAdRepository = new SqlAdmissionRepository();
// // const admissionService = new UGAdmissionService(sqlAdRepository);
// // const pgadmissionService = new PGAdmissionService(sqlAdRepository);

// export interface IWorker{
//   writeCode():void
//   testCode():void
//   deployCode():void
// }

// class Worker implements IWorker {

//   writeCode(): void {
//     console.log("Writing code");
//   }

//   testCode(): void {
//     console.log("Testing code");
//   }

//   deployCode(): void {
//     console.log("Deploying code");
//   }
// }

// class Developer extends Worker {}

// class Tester extends Worker {

//   writeCode(): void {
//     throw new Error("Tester doesn't write code");
//   }

//   deployCode(): void {
//     throw new Error("Tester doesn't deploy code");
//   }
// }

// export interface IProjectManager{
//   processRelease():void
// }
// class ProjectManager  implements IProjectManager{

//   private developer = new Developer();

//   processRelease(): void {

//     this.developer.writeCode();
//     this.developer.testCode();
//     this.developer.deployCode();
//   }
// }

interface INotification{
  send(message:string):void
}
class Notification {
  send(message: string): void {
    console.log(`Sending: ${message}`);
  }
}

class EmailNotification implements INotification {
  send(message: string): void {
    console.log(`Email sent: ${message}`);
  }
}

class PushNotification extends INotification {
  send(message: string): void {
    console.log(`Push sent: ${message}`);
  }
}



function notifyAll(
  notifications: Notification[],
  message: string
) {
  for (const notification of notifications) {
    notification.send(message);
  }
}

notifyAll([
  new EmailNotification(),
  new PushNotification(),

], "Server is down!");
