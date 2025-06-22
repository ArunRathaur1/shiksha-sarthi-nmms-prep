#include<bits/stdc++.h>
using namespace std;
void solve(){
    int w,h,a,b;
    int x1,y1,x2,y2;
    cin>>w>>h>>a>>b;
    cin>>x1>>y1>>x2>>y2;
    if(x1>x2){
        swap(x1,x2);
    }
    int c1=x1+a-x2;
    if(y1>y2){
        swap(y1,y2);
    }
    int c2=y1+b-y2;
    if(c1%a==0||c2%b==0){
        cout<<"YES"<<endl;
    }
    else{
        cout<<"NO"<<endl;
    } 
}
int main()
{
    int t;
    cin>>t;
    while(t--){
        solve();
    }
}
