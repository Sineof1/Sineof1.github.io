function GCF(a, b) {
   if (b === 0) return a;
   else return GCF(b, a % b);
}
