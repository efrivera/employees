let employees = {};

function Employee(id, name, lastName, email = '', skills = {}) {
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
  this.skills = skills;

  this.basicInfoEdit = (name = this.name, lastName = this.lastName, email = this.email) => {
    this.name = (name === '' || name === null) ? this.name : name;
    this.lastName = (lastName === '' || lastName === null) ? this.lastName : lastName;
    this.email = (email === '' || email === null) ? this.email : email;
  };

  this.skillAdd = function(newSkill, value) {
    this.skills = {
      ...this.skills,
      [newSkill]: value,
    }
    saveLocalStorage(employees);
  };

  this.skillRemove = function(skillToRemove) {
    delete this.skills[skillToRemove];
    saveLocalStorage(employees);
  };

  this.skillModify = function(skill, newValue) {
    this.skills = {
      ...this.skills,
      [skill]: newValue,
    }
    saveLocalStorage(employees);
  };

  Object.defineProperty(this, 'salary', {
    get: function() {
      return salary;
    },
    set: function(value) {
      //value validation
      salary = {
        ...salary,
        ...value,
      };
    }
  });
}

const addEmployee = (id, name, lastName, email, skills) => {
  const newEmployee = new Employee(id, name, lastName, email, skills);
  employees = {
    ...employees,
    [id]: newEmployee,
  }
  saveLocalStorage(employees);
};

const editEmployee = (id, name = this.name, lastName = this.lastName, email = this.email) => {
  if(!id)
    throw new Error('id is mandatory');
  employees[id].basicInfoEdit(name, lastName, email);
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
    addEmployee(element['id'], element['name'], element['lastName'], element['email'], element['skills']);
  });
})();

console.log('employees:', employees);
