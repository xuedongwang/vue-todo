const url = 'http://localhost:8000/';

describe('测试todo添加功能', function() {
  it('能正确访问todo app', function() {
    cy.visit(url)
  });
  it('能正确输入新todo的内容', function() {
    cy.get('.add-todo-input')
      .type('todo')
      .should('have.value', 'todo');
  });
  it('添加todo成功', function() {
    cy.get('.add-todo-input')
      .type('{enter}');
    cy.get('.todo-text').contains('todo')
  });
});

describe('测试todo删除功能', function() {
  it('删除todo成功', function() {
    cy.get('.item-inner').first().trigger('mouseover')
    // todo
    cy.get('i.delete-todo').first().click({force: true})
  });
});

let todoCount = 10;
const undoneTodoCount = 5;
describe(`测试添加${todoCount}个todo`, function() {
  for(let i = 1; i <= todoCount; i ++) {
    const todoContent = `这是第${i}个todo`;
    it(`添加第${i}个todo`, function() {
      cy.get('.add-todo-input')
        .type(todoContent)
        .should('have.value', todoContent);
      cy.get('.add-todo-input')
        .type('{enter}');
      cy.get('.todo-text').contains(todoContent)
    });
    it(`测试添加todo和显示数量一致:添加了${i}个，显示${i}`, function() {
      cy.get('.control-inner .inner-left')
        .contains(i)
    });
  }

  for(let i = 0; i < todoCount; i ++) {
    it(`完成第${i+1}个todo`, function() {
      cy.get('.todo-item').eq(i).find('.item-inner.undone img')
        .click();
        cy.get('.todo-item').eq(i).get('.item-inner.done')
    });
    it(`测试添加todo和显示数量一致:完成了${i+1}个，显示${todoCount-i-1}`, function() {
      cy.get('.control-inner .inner-left')
        .contains(todoCount-i-1)
    });
  }

  for(let i = 0; i < undoneTodoCount; i ++) {
    it(`取消完成第${i+1}个todo`, function() {
      cy.get('.todo-item').eq(i).find('.item-inner.done img')
        .click();
        cy.get('.todo-item').eq(i).get('.item-inner.undone')
    });
    it(`测试添加todo和显示数量一致:取消完成了${i+1}个，显示${i+1}`, function() {
      cy.get('.control-inner .inner-left')
        .contains(i+1)
    });
  }
});

describe('测试tab切换', function() {
  it('切换到active', function() {
    cy.get('.undone-todo.control-item').click();
    cy.get('.control-inner .inner-left')
        .contains(undoneTodoCount)
  });
  it('切换到completed', function() {
    cy.get('.done-todo.control-item').click();
    cy.get('.control-inner .inner-left')
        .contains(0)
  });
  it('切换到all', function() {
    cy.get('.all-todo.control-item').click();
    cy.get('.control-inner .inner-left')
        .contains(undoneTodoCount)
  });
});

describe('测试全选/取消全选功能', function() {
  it('全选', function() {
    cy.get('.toggle-all').click();
    cy.get('.control-inner .inner-left')
        .contains(0)
  });
  it('取消全选', function() {
    cy.get('.toggle-all').click();
    cy.get('.control-inner .inner-left')
        .contains(todoCount)
  });
});

describe('测试清除全部已完成功能', function() {
  it('清除', function() {
    cy.get('.toggle-all').click();
    cy.get('.control-inner .inner-right').click();
  });
});
