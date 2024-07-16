interface PaypalPayment {
    id: string;
    status: string;
    payment_source: {
      paypal: {
        email_address: string;
        account_id: string;
        account_status: string;
        name: {
          given_name: string;
          surname: string;
        };
        address: {
          country_code: string;
        };
      };
    };
    purchase_units: {
      reference_id: string;
      shipping: {
        name: {
          full_name: string;
        };
        address: {
          address_line_1: string;
          admin_area_2: string;
          admin_area_1: string;
          postal_code: string;
          country_code: string;
        };
      };
      payments: {
        captures: {
          id: string;
          status: string;
          amount: {
            currency_code: string;
            value: string;
          };
          final_capture: boolean;
          seller_protection: {
            status: string;
            dispute_categories: string[];
          };
          seller_receivable_breakdown: {
            gross_amount: {
              currency_code: string;
              value: string;
            };
            paypal_fee: {
              currency_code: string;
              value: string;
            };
            net_amount: {
              currency_code: string;
              value: string;
            };
          };
          links: {
            href: string;
            rel: string;
            method: string;
          }[];
          create_time: string;
          update_time: string;
        }[];
      };
    }[];
    payer: {
      name: {
        given_name: string;
        surname: string;
      };
      email_address: string;
      payer_id: string;
      address: {
        country_code: string;
      };
    };
    links: {
      href: string;
      rel: string;
      method: string;
    }[];
  }