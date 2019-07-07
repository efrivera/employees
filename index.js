let employees = {};

function Employee(id, name, lastName, email) {
  let salary = {
    basico: 0,
    bonos: 0,
    deducibles: 0,
    neto: 0,
  };

  this.name = name;
  this.lastName = lastName;
  this.email = email;
  this.id = id;
  this.skills = [];

  this.editBasicInfo = (name = this.name, lastName = this.lastName, email = this.email) => {
    this.name = (name === '' || name === null) ? this.name : name;
    this.lastName = (lastName === '' || lastName === null) ? this.lastName : lastName;
    this.email = (email === '' || email === null) ? this.email : email;
  };

  this.addSkill = function(newSkill, value) {
    this.skills = {
      ...this.skills,
      [newSkill]: value,
    }
  };

  this.removeSkill = function(skillToRemove) {
    delete this.skills[skillToRemove];
  };

  this.modifySkill = function(skill, newValue) {
    this.skills = {
      ...this.skills,
      [skill]: newValue,
    }
  };

  Object.defineProperty(this, 'salary', {
    get: function() {
      return salary;
    },
    set: function(data) {
      this.salary = {
        ...this.salary,
        ...data,
      };
    }
  });
}

const addEmployee = (id, name, lastName, email) => {
  const newEmployee = new Employee(id, name, lastName, email);
  employees = {
    ...employees,
    [id]: newEmployee,
  }
  saveLocalStorage(employees);
};

const editEmployee = (id, name = this.name, lastName = this.lastName, email = this.email) => {
  if(!id)
    throw new Error('id is mandatory');
  employees[id].editBasicInfo(name, lastName, email);
  saveLocalStorage(employees);
};

const removeEmployee = (id) => {
  delete employees[id];
  saveLocalStorage(employees);
};

const saveLocalStorage = (data) => {
  let dataToStore = [];
  localStorage.removeItem('employees');

  for (let employee in data)
    dataToStore.push(data[employee]);

  localStorage.setItem('employees', JSON.stringify(dataToStore));
};

(function() {
  let employeesRetrievedData = JSON.parse(localStorage.getItem('employees')) || [];
  employeesRetrievedData.forEach((element) => {
    addEmployee(element['id'], element['name'], element['lastName'], element['email']);
  });
})();

console.log('employees:', employees);
