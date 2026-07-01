interface ISqlAdmissionRepository {
  save(studentName: string): void;
}

class SqlAdmissionRepository implements ISqlAdmissionRepository {
  save(studentName: string): void {
   // console.log(`Saving ${studentName} in SQL Database`);
  }
}

class AdmissionService {
  constructor(private _adminRepo: ISqlAdmissionRepository) {}
  processAdmission(studentType: string, studentName: string): void {
    if (studentType === "UG") {
   //   console.log("Processing UG Admission");
    } else if (studentType === "PG") {
    //  console.log("Processing PG Admission");
    }

    this._adminRepo.save(studentName);
  }
}

const adminRepo = new SqlAdmissionRepository();
const adminservice = new AdmissionService(adminRepo);



interface IAAPP {
  applyForAdmission(): void;
  payFees(): void;
}

interface Iorientation{
    attendOrientation():void
}

interface ManageHostal{
    manageHostal():void
}
class UndergraduateStudents implements AdmissionOperations, ManageHostal,Iorientation{
  applyForAdmission(): void {
//    console.log("UG Admission Applied");
  }

  payFees(): void {
  //  console.log("UG Fees Paid");
  }

  attendOrientation(): void {
 //   console.log("UG Orientation Attended");
  }

  manageHostal(): void {
    console.log("UG Hostel Allocated");
  }
}



class DistanceLearningStudents implements AdmissionOperations {
  applyForAdmission(): void {
    console.log("Distance Learning Admission Applied");
  }

  payFees(): void {
    console.log("Distance Learning Fees Paid");
  }

  attendOrientation(): void {
    throw new Error("No Orientation Required");
  }

  manageHostel(): void {
    throw new Error("No Hostel Required");
  }
}
