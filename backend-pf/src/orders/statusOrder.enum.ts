export enum statusOrder {
    PENDING = 'Pendiente',
    AWAITING_PAYMENT = 'En espera de pago',
    AWAITING_FULFILLMENT = 'En espera de cumplimiento',
    AWAITING_SHIPMENT = 'En espera de envío',
    AWAITING_PICKUP = 'Esperando recogida',
    PARTIALLY_SHIPPED = 'Parcialmente enviado',
    COMPLETED = 'Terminado',
    SHIPPED = 'Enviado',
    CANCELLED = 'Cancelado',
    DECLINED = 'Rechazado',
    REFUNDED = 'Reintegrado',
    DISPUTED = 'Cuestionado',
    MANUAL_VERIFICATION = 'Verificación manual',
    PARTIALLY_REFUNDED = 'Reitegrado parcialmente'
}