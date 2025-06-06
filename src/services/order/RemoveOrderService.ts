import prismaClient from "../../prisma";

type OrderRequest = {
    order_id: string;
}

class RemoveOrderService {
    async execute({order_id}: OrderRequest){
        const order = await prismaClient.order.delete({
            where:{
                id: order_id,
            }
        })
        return order;
    }
}

export { RemoveOrderService}