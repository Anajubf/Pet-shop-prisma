import * as PetModel from './../models/petModel.js'

export const listarTodos = async ( req, res ) => {
    try {
        const pets = await PetModel.findAll();
        if(!pets || pets.length === 0) {
           return res.status(404).json({
                total: pets.length,
                message: 'Não há pets na lista',
                pets
            })
        }

        res.status(200).json({
            total: pets.length,
            message: 'Lista de pets',
            pets
        })
    } catch (error) {
        res.status(500).json({
            erro: 'Erro interno de servidor',
            detalhes: error.message,
            status: 500
        })
    }
}

export const listarUm = async ( req, res ) => {
    try {
        const  id  = req.params.id;
        const pet = await PetModel.findById(id);

        if (!pet) {
            return res.status(404).json({
                erro: 'Pet não encontrado!',
                message: 'Verifique se o id do Pet existe',
                id: id
            })
        }

        res.status(200).json({
            message: 'Pet encontrado',
            pet
        })
    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao buscar pet por id',
            detalhes: error.message
        })
    }
}

export const criar = async ( req, res) => {
    try {
        const {nome, especie, idade, dono, createdAt, updateAt} = req.body;


        const dado = req.body;
       
        const campoObrigatorios = [ 'nome', 'especie', 'idade', 'dono'];


        const faltando = campoObrigatorios.filter(campo => !dado[campo]);


        if (faltando.length > 0) {
            return res.status(400).json({
                erro: `Os seguintes campos são obrigatórios: ${faltando.join(', ')}.`
        });
        }


        const novoPet = await PetModel.create(dado);


        res.status(201).json({
            message: 'Pet adicionado com sucesso',
            pet: novoPet
        })
    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao adicionar pet!',
            detalhes: error.message
        })
    }
}

export const apagar = async ( req, res ) => {
    try {
        const id = parseInt (req.params.id);

        const petExiste = await PetsModel.findById(id);

        if(!petExiste) {
            return res.status(404).json({
                erro: 'Pet  não encontrado com esse Id',
                id: id 
            })
        }

        await PetsModel.deletePet(id)

        res.status(200).json({
            message:  'Pet removido com sucesso!',
            petRemovido: petExiste
        })

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao apagar pet!',
            detalhes: error.message
        })
    }
}

export const atualizar = async ( req, res ) => {
    try {
        const id = parseInt(req.params.id)

        const dados = req.body7

        const petExiste = await PetsModel.findById(id);

        if (!petExiste) {
            return res.status(404).json({
                erro: 'Pet não encontrado com esse Id',
                id: id
            })
        }

        if (dados.especie) {
            const especiesValidas = ['Cachorro', 'Gato', 'Passáro', 'Coelho'];
            if (!especiesValidas.includes(dados.especie)) {
                return res.status(400).json({
                    erro: 'Espécie inválida',
                    especiesValidas
                })
            }
        }

        const petAtualizado = await PetsModel.update(id, dados);

        res.status(200).json({
            message: 'Pet atualizado com sucesso',
            pet: petAtualizado
        })

    } catch (error) {
        res.status(500).json({
            error: 'Erro ao atualizar pets',
            detalhes: error.message
        })
    }
}
