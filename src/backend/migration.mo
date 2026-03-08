import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import AccessControl "authorization/access-control";

module {
  type UserProfile = {
    name : Text;
  };

  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    imageUrl : Text;
  };

  type CartItem = {
    productId : Nat;
    quantity : Nat;
  };

  type OrderRequest = {
    id : Nat;
    customerName : Text;
    customerEmail : Text;
    shippingNote : Text;
    items : [CartItem];
    totalAmount : Nat;
    timestamp : Time.Time;
  };

  type OldActor = {
    accessControlState : AccessControl.AccessControlState;
    userProfiles : Map.Map<Principal, UserProfile>;
    products : Map.Map<Nat, Product>;
    orderRequests : Map.Map<Nat, OrderRequest>;
    nextOrderId : Nat;
  };

  type NewActor = {
    accessControlState : AccessControl.AccessControlState;
    userProfiles : Map.Map<Principal, UserProfile>;
    products : Map.Map<Nat, Product>;
    orderRequests : Map.Map<Nat, OrderRequest>;
    nextOrderId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    { old with products = Map.empty<Nat, Product>() };
  };
};
