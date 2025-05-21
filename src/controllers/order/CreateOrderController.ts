import { CreateOrderService } from "../../services/order/CreateOrderService"

interface CreateOrderBody {
    table: number;
    name?: string;
  }
class CreateOrderController {
    async handle(req: Request, res: Response): Promise<Response> {
        // @ts-expect-error
        const { table, name }: { table: number; name?: string } = req.body;

        const createOrderService = new CreateOrderService()
        const order = await createOrderService.execute({
            table: table,
            name: name,
        })
        // @ts-expect-error
        return res.json(order)

    }
}

export { CreateOrderController }