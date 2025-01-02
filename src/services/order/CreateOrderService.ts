import prismaClient from "../../prisma";

type OrderRquest = {
    table: number;
    name: string
}

class CreateOrderService {
    async execute({table, name}: OrderRquest){
        const order = await prismaClient.order.create({
            data: {
                table: table,
                name: name
            }
        })
        return order;
    }
}

export { CreateOrderService}