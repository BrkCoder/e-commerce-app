import { Avatar, Button, Flex, List, Typography } from "antd";
import useCartStore from "../store/useCartStore";
import { useUserStore } from "../store/userStore";

const Cart = () => {
  const { profile } = useUserStore();
  const { items, removeFromCart, clearCart } = useCartStore(profile?.id || 0)();

  return (
    <div className="cart-page">
      <Typography.Title level={2}>My Cart</Typography.Title>
      {items?.length === 0 && (
        <Typography.Paragraph>
          Your cart is empty. Start shopping!
        </Typography.Paragraph>
      )}
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={items}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <Typography.Text key="price">
                ${item.price.toFixed(2)}
              </Typography.Text>,
              <Typography.Text key="quantity">
                Quantity: {item.quantity}
              </Typography.Text>,
              <Typography.Text
                type="danger"
                key="remove"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </Typography.Text>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar size={'large'} src={item.image} />
              }
              title={item.name}
              description={item.description}
            />
          </List.Item>
        )}
      />
      {items?.length > 0 && (
        <Flex
          vertical={false}
          gap={16}
          style={{ marginTop: 16 }}
          align="flex-start"
          justify="space-between"
        >
          <Flex vertical={false} gap={16} align="flex-start">
            <Typography.Title level={4}>Cart Summary:</Typography.Title>
            <Flex vertical={true} gap={16} align="flex-start">
              <Typography.Paragraph>
                Total Items: {items?.length} <br />
                Total Price: $
                {items
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </Typography.Paragraph>
            </Flex>
          </Flex>
          <Flex vertical={false} gap={16} align="flex-start">
            <Button type="primary" danger={true} onClick={clearCart}>
              Clear Cart
            </Button>
            <Button
              type="primary"
              color="default"
              onClick={() => console.log("Proceed to Checkout")}
            >
              Proceed to Checkout
            </Button>
          </Flex>
        </Flex>
      )}
    </div>
  );
};

export default Cart;
