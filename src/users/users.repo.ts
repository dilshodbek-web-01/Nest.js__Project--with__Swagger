import e from 'express';

let users = [
  {
    id: 1,
    title: 'user1',
    age: 23,
  },
  {
    id: 2,
    title: 'user2',
    age: 24,
  },
  {
    id: 3,
    title: 'user3',
    age: 25,
  },
  {
    id: 4,
    title: 'user4',
    age: 26,
  },
];

export class UsersRepository {
  getUsers() {
    return users;
  }

  createUser(user) {
    users.push({ id: users.length + 1, ...user });

    return user;
  }

  getOne(id) {
    return users.find((el) => el.id === +id);
  }

  deleteUser(id) {
    users.forEach((el, idx) => {
      if (el.id == id) {
        users.splice(idx, 1);
      }
    });
    return {
      id,
    };
  }

  updateUser(id, userInfo) {
    let { title, age } = userInfo;
    users.forEach((el) => {
      if (el.id == id) {
        el.title = title ? title : el.title;
        el.age = age ? age : el.age;
      }
    });

    return {
      id,
    };
  }
}
