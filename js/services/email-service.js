import utilService from './util-service.js';

var emails = [
  {
    subject: 'Welcome to our Academy',
    body:
      'We are glad to notify you your subscription was accepted. Please lorem us now. Your details were accepted. best luck and regards, Shalom',
    isRead: false,
    sentAt: 1530807066671,
    id: 'K8ReJd3R'
  },

  {
    subject:
      'Learn JavaScript Properly (For Beginners and Experienced Programmers)',
    body:
      'This study guide, which I also refer to as a course outline and a road map, gives you a structured and instructive outline for learning JavaScript properly. In fact, you will find two study guides below, one for absolute beginners and the other for experienced programmers and web developers. You do want to learn JavaScript. I presume you are here for that reason, and you have made a wise decision. For if you want to develop modern websites and web applications (including an internet startup), or if you want a high-paying developer job ($75K to $250K+), JavaScript is undoubtedly the best web-development language to learn today, unless you want to develop native iOS or Android apps exclusively. And while there exist ample online resources to teach you JavaScript, finding the most efficient and beneficial method to learn the “language of the web” can be a frustrating endeavor. This study guide streamlines and simplifies the process; it has proven successful in helping thousands, and thousands more read and follow it each day.',
    isRead: false,
    sentAt: 1530007066502,
    id: 'p5ReZdwf'
  },

  {
    subject: 'We run out of ideas for Email subjects. please help',
    body:
      "The leaf spring is the oldest and simplest suspension. Several long, thin steel leaves are bound together in a pack by clamps. One end of the pack is connected to the vehicle's frame vis a bushing. The other end uses a shackle that can move for and aft. Combined with the flexing of the leaf pack itself, that provides the suspension movement and cushions the ride. Most modern pickup trucks still use this setup for their rear suspension because of its simplicity and durability. The Chevrolet video from the 1930s shows how the suspension works and outlines its drawbacks for passenger car use. The manual transmission        The old-school manual might be an endangered species, but you should learn to drive you—and learn how it works. Manual transmissions provide a direct connection to the machine—one that makes the whole experience of driving a more rewarding activity.        The job of the manual transmission is to transmit the engine's torque from the input shaft, through various gearsets to the output and on to the axle and driven wheels. Those gearsets in the transmission combine with the gears in the axle to multiply the torque of the engine and get the car moving. This basic animation shows how the gears are selected, and what these gears actually do when you move the shifter.",
    isRead: false,
    sentAt: 1400000000000,
    id: 't5FeR2Jv'
  },

  {
    subject: 'Information about your request',
    body:
      'All you need to do is get into the first link and press accept. best luck and regards,  refer to as a course outline and a road map, gives you a structured and instructive outline for learning JavaScript properly. In fact, you will find two study guides below, one for absolute beginners',
    isRead: false,
    sentAt: 1500000000000,
    id: 'ZZReJd39'
  },

  {
    subject: 'Hi Shlomi, can you call me back? your phone is off',
    body:
      'I hate to say it, but its annoying. so lorem it. This study guide, which I also refer to as a course outline and a road map, gives you a structured and instructive outline for learning JavaScript properly. In fact, you will find two study guides below, one for absolute beginners and the other for experienced programmers and web developers. You do want to learn JavaScript. I presume you are here for that reason, and you have made a wise decision. For if you want to develop modern websites and web applications (including an internet startup), or if you want a high-paying developer job ($75K to $250K+), JavaScript is undoubtedly the best web-development language to learn today, unless you want to develop native iOS or Android apps exclusively. And while there exist ample online resources to teach you JavaScript, finding the most efficient and beneficial method to learn the “language of the web” can be a frustrating endeavor. This study guide streamlines and simplifies the process; it has proven successful in helping thousands, and thousands more read and follow it each day.',
    isRead: false,
    sentAt: 1430807000000,
    id: '7XReZdwD'
  },

  {
    subject:
      'Automotive Animations That Masterfully Explain How Your Car Works',
    body:
      "No one knows weather your car is good. but sometimes you are bound together in a pack by clamps. One end of the pack is connected to the vehicle's frame vis a bushing. The other end uses a shackle that can move for and aft. Combined with the flexing of the leaf pack itself, that provides the suspension movement and cushions the ride. Most modern pickup trucks still use this setup for their rear suspension because of its simplicity and durability. The Chevrolet video from the 1930s shows how the suspension works and outlines its drawbacks for passenger car use. The manual transmission        The old-school manual might be an endangered species, but you should learn to drive you—and learn how it works. Manual transmissions provide a direct connection to the machine—one that makes the whole experience of driving a more rewarding activity.        The job of the manual transmission is to transmit the engine's torque from the input shaft, through various gearsets to the output and on to the axle and driven wheels. Those gearsets in the transmission combine with the gears in the axle to multiply the torque of the engine and get the car moving. This basic animation shows how the gears are selected, and what these gears actually do when you move the shifter.",
    isRead: false,
    sentAt: 1390807000000,
    id: 'pkFeR2Jm'
  }
];

export default {
  getEmails,
  getEmailById,
  getNextEmailId,
  getPrevEmailId,
  markAsRead,
  markAsUnread,
  getUnreadCount,
  createNewEmail,
  sendEmail,
  clearEmail
};

function getEmails() {
  return Promise.resolve(emails);
}

function getEmailById(id) {
  return Promise.resolve(
    emails.find(email => {
      return email.id === id;
    })
  );
}

function markAsRead(id) {
  console.log('SERVICE - markAsRead on id: ', id);
  emails.find(email => {
    return email.id === id;
  }).isRead = true;
}

function markAsUnread(id) {
  console.log('SERVICE - markAsUnread on id: ', id);
  emails.find(email => {
    return email.id === id;
  }).isRead = false;
}

function getNextEmailId(id) {
  var idx = emails.findIndex(function(email) {
    return email.id === id;
  });
  idx = idx + 1;
  if (idx === emails.length) idx = 0;
  return Promise.resolve(emails[idx].id);
}

function getPrevEmailId(id) {
  var idx = emails.findIndex(function(email) {
    return email.id === id;
  });
  idx = idx - 1;
  if (idx === -1) idx = emails.length - 1;
  return Promise.resolve(emails[idx].id);
}

function getUnreadCount() {
  var sum = 0;
  var res = {};
  for (let i = 0; i < emails.length; i++) {
    if (!emails[i].isRead) sum++;
  }
  res['total'] = emails.length;
  res['unread'] = sum;
  return res;
}

function createNewEmail() {
  var newEmail = {
    subject: '',
    body: '',
    isRead: false,
    sentAt: null,
    id: utilService.makeId(8)
  };
  emails.push(newEmail);
  return newEmail;
}

function sendEmail(newEmail) {
  // because sending to myself, it arrives to the emails array
  var newEmailIdx = emails.findIndex(function(email) {
    return email.id === newEmail.id;
  });
  emails[newEmailIdx] = newEmail;
  newEmail.sentAt = Date.now();
  console.log('sending complete. the new emails array is \n', emails);
  return Promise.resolve('Sending OK');
}

function clearEmail(id) {
  var idx = emails.findIndex(function(email) {
    return email.id === id;
  })
  emails.splice(idx ,  1);
}


// subject: 'Welcome to our Academy',
// body:
//   'We are glad to notify you your subscription was accepted. Please lorem us now. Your details were accepted. best luck and regards, Shalom',
// isRead: false,
// sentAt: 1530807066671,
// id: 'K8ReJd3R'

//  => {
//   console.log ('Service: the next email is ', emails[idx+1])
//   return emails[idx+1];
// })
// this.emails.findIdx
// )

/*

import utilService from './util.service.js';
import storageService from './storage.service.js';
import eventBus, { USR_MSG_DISPLAY } from './event-bus.service.js';

var todos = [];
var TODOS_KEY = 'todosApp';
var todosFilter = 'All';

export default {};

function createTodos() {
  todos = loadFromStorage(TODOS_KEY);
  if (!todos || todos.length === 0) {
    todos = [];
    todos.push(createTodo('Learn Javascript'));
    todos.push(createTodo('Play with HTML5'));
    todos.push(createTodo('Master CSS'));
  }
}

function createTodo(txt) {
  return {
    id: makeId(),
    txt: txt,
    isDone: false
  };
}

function addTodo(todoTxt) {
  var newTodo = createTodo(todoTxt);
  todos.unshift(newTodo);
  saveTodos();
  return Promise.resolve(newTodo);
}

function deleteTodo(id) {
  var todoIdx = getTodoIdxById(id);
  if (todoIdx === -1) return;
  todos.splice(todoIdx, 1);
  saveTodos();
  return Promise.resolve();
}

function toggleTodo(id) {
  var todo = getTodoById(id);
  if (!todo) return;
  todo.isDone = !todo.isDone;
  saveTodos();
  return Promise.resolve(todo);
}

function getTodoById(id) {
  var todo = todos.find(todo => todo.id === id);
  return Promise.resolve(todo);
}

function getTodoIdxById(id) {
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];
    if (todo.id === id) return i;
  }
  return -1;
}

function setFilter(strFilter) {
  todosFilter = strFilter;
}

function getTodosForDisplay() {
  var todos = [];
  todos.forEach(function(todo) {
    if (
      todosFilter === 'All' ||
      (todosFilter === 'Active' && !todo.isDone) ||
      (todosFilter === 'Done' && todo.isDone)
    ) {
      todos.push(todo);
    }
  });
  return Promise.resolve(todos);
}

function getCount() {
  return todos.length;
}

function getActiveCount() {
  var activeCount = 0;
  todos.forEach(function(todo) {
    if (!todo.isDone) activeCount++;
  });
  return activeCount;
}

function saveTodos() {
  saveToStorage(TODOS_KEY, todos);
}

// ================  Data Base ===============


*/
