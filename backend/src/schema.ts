import {GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLBoolean, GraphQLID, GraphQLList, GraphQLNonNull} from 'graphql';
import {getRepository} from 'typeorm';
import {Todo} from './entity/Todo';

const TodoType = new GraphQLObjectType({
    name: 'Todo',
    fields: {
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        completed: {type: GraphQLBoolean}
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        todos: {
            type: new GraphQLList(TodoType),
            resolve: async () => {
                const todoRepository = getRepository(Todo);
                return await todoRepository.find();
            }
        },
        todo: {
            type: TodoType,
            args: {id: {type: GraphQLID}},
            resolve: async (_parent, args) => {
                const todoRepository = getRepository(Todo);
                return await todoRepository.findOne(args.id);
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTodo: {
            type: TodoType,
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: async (_parent, args) => {
                const todoRepository = getRepository(Todo);
                const newTodo = todoRepository.create({title: args.title});
                return await todoRepository.save(newTodo);
            }
        },
        updateTodo: {
            type: TodoType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                completed: {type: new GraphQLNonNull(GraphQLBoolean)}
            },
            resolve: async (_parent, args) => {
                const todoRepository = getRepository(Todo);
                const todoToUpdate = await todoRepository.findOne(args.id);
                if (todoToUpdate) {
                    todoToUpdate.completed = args.completed;
                    return await todoRepository.save(todoToUpdate);
                }
                throw new Error('Todo not found');
            }
        },
        deleteTodo: {
            type: TodoType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve: async (_parent, args) => {
                const todoRepository = getRepository(Todo);
                const todoToDelete = await todoRepository.findOne(args.id);
                if (todoToDelete) {
                    await todoRepository.remove(todoToDelete);
                    return todoToDelete;
                }
                throw new Error('Todo not found');
            }
        }
    }
});

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
