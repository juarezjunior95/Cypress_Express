import {faker} from '@faker-js/faker'

/// <reference types="cypress" />

describe('tasks',()=>{
    context('Cadastro', () =>{
        it('Criar tarefa' , ()=>{

            const taskName = 'Estudar Api com Cypress'
            
            cy.removeTaskByName(taskName)
            
            cy.createTask(taskName)
            
            
            cy.contains('main div p',taskName)
                .should('be.visible')
        })
    
        it('Não deve permitir tarefa duplicada', ()=>{
    
            const task ={
                name: 'Estudar Api com Cypress',
                is_done: false
    
            }
    
            cy.removeTaskByName(task.name)
            cy.postTask(task)
           cy.createTask(task.name)
    
            cy.get('.swal2-html-container')
             .should('be.visible')
             .should('have.text','Task already exists!')
        })
    
        it('Campo obrigatorio', ()=>{
            cy.createTask()
            cy.isRequired('This is a required field')
        
        })

    }) 

    context('atualização',() =>{
        it('Deve concluir uma tarefa' , () =>{
            const task = {
                name:'Ir no mercado hoje' , 
                is_done: false

            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')
    })
})
context('Exclusão',() =>{
    it('Deve remover uma tarefa' , () =>{
        const task = {
            name:'Estudar Api com Cypress' , 
            is_done: false

        }

        cy.removeTaskByName(task.name)
        cy.postTask(task)

        cy.visit('/')

        cy.contains('p', task.name)
            .parent()
            .find('button[class*=ItemDelete]')
            .click()

        cy.contains('p', task.name)
            .should('not.exist')
})
})

})