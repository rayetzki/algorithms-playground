const True = T => F => T; // λa.b a
const False = T => F => F; // λa.b b
const And = E1 => E2 => E1(E2)(E1); //λp.λq p q p
const Or = E1 => E2 => E1(E1)(E2); //λp.q p p q
const If = Condition => Then => Else => Condition(Then)(Else); // λp.λa.λb. p a bm
const Mockingbird = f => f(f); // λxλxx
const Y = g => (x => g(x(x)))(x => g(x(x))); //λg.(λx. g (x x))(λx. g (x x))