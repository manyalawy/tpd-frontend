import React from "react";
import { Route } from "react-router-dom";
import { accountProperties } from "#Helpers";
//Components
import ReleaseForm from "#Components/ReleaseRequests/Form";
import Resource from "#Components/ResourceRequests";
import ResourceForm from "#Components/ResourceRequests/Form";
import Release from "#Components/ReleaseRequests";
import Profile from "#Components/Profile/Profile.jsx";
import AssignmentsHisotry from "#Components/AssignmentsHistory";
import Employees from "#Components/Employees";
import SkillListing from "#Components/SkillListing";
import SkillsTracking from "#Components/SkillsTracking";
import SkillsHistory from "#Components/SkillsHistory";
import Certifications from "#Components/Certifications";
import TPDGuard from "#Components/Guards/TPDGuard.js";
import CerHistory from "#Components/CertificationsHistory";
import EmployeeTrainings from "#Components/EmployeesTrainings";
import EmployeeProfile from "#Components/EmployeeProfile/Profile";
import EmployeeAssignementHistory from "#Components/EmployeeAssignmentsHistory";
import CertificationProviders from "#Components/Certifications";
import MyTrainings from "#Components/Profile/MyProfileComponents/Trainings";
import MySkills from "#Components/Profile/MyProfileComponents/skills";
import MyCertifications from "#Components/Profile/MyProfileComponents/certificates";
import MyAssignments from "#Components/Profile/MyProfileComponents/Assigments";
import MyAssignmentsHistory from "#Components/AssignmentsHistory";
import ManagerTPDGuard from "#Components/Guards/ManagerTPDGuard";
import SideMenu from "#Components/SideMenu";

const DefaultContainer = () => (
  <>
    <SideMenu />
    {accountProperties().roles?.includes("TPD Team") ? (
      <ManagerTPDGuard>
        <Route exact path="/" component={Release} />
      </ManagerTPDGuard>
    ) : accountProperties().roles?.includes("Manager") ? (
      <ManagerTPDGuard>
        <Route exact path="/" component={Release} />
      </ManagerTPDGuard>
    ) : (
      <>
        <div style={{ margin: "40px" }}>
          <Route exact path="/" component={MyAssignments} />
        </div>
      </>
    )}

    <Route exact path="/profile" component={Profile} />
    <Route exact path="/profile/trainings" component={MyTrainings} />
    <Route exact path="/profile/skills" component={MySkills} />
    <Route exact path="/profile/certifications" component={MyCertifications} />
    <Route exact path="/profile/assignments" component={MyAssignments} />
    <Route
      exact
      path="/profile/assignments/history"
      component={MyAssignmentsHistory}
    />
    <TPDGuard>
      <Route
        exact
        path="/profile/assignments-history"
        component={AssignmentsHisotry}
      />
    </TPDGuard>
    <TPDGuard>
      <Route exact path="/employee-profile" component={EmployeeProfile} />
    </TPDGuard>
    <TPDGuard>
      <Route
        exact
        path="/employee-profile/assignments-history"
        component={EmployeeAssignementHistory}
      />
    </TPDGuard>
    <ManagerTPDGuard>
      <Route exact path="/release-requests" component={Release} />
    </ManagerTPDGuard>
    <ManagerTPDGuard>
      <Route exact path="/release-requests/add" component={ReleaseForm} />
    </ManagerTPDGuard>
    <ManagerTPDGuard>
      <Route exact path="/release-requests/edit" component={ReleaseForm} />
    </ManagerTPDGuard>
    <ManagerTPDGuard>
      <Route exact path="/resource-requests" component={Resource} />
    </ManagerTPDGuard>
    <ManagerTPDGuard>
      <Route exact path="/resource-requests/add" component={ResourceForm} />
    </ManagerTPDGuard>
    <ManagerTPDGuard>
      <Route exact path="/resource-requests/edit" component={ResourceForm} />
    </ManagerTPDGuard>
    <TPDGuard>
      <Route exact path="/certifications-history" component={CerHistory} />
    </TPDGuard>
    <TPDGuard>
      <Route exact path="/skill-tracking" component={SkillsTracking} />
    </TPDGuard>
    <TPDGuard>
      <Route exact path="/skills-history" component={SkillsHistory} />
    </TPDGuard>
    <TPDGuard>
      <Route exact path="/certifications-list" component={Certifications} />
    </TPDGuard>
    <TPDGuard>
      <Route
        exact
        path="/certification-providers"
        component={CertificationProviders}
      />
    </TPDGuard>
    <TPDGuard>
      <Route exact path="/skills-listing" component={SkillListing} />
    </TPDGuard>
    <TPDGuard>
      <Route exact path="/employee-trainings" component={EmployeeTrainings} />
    </TPDGuard>
    <TPDGuard>
      <Route exact path="/employees" component={Employees} />
    </TPDGuard>
  </>
);

export default DefaultContainer;
