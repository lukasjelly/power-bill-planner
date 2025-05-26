# Power Bill Planner

A Vue.js web application that helps you plan weekly power bill payments based on your billing cycles and payment schedule. This project was created as a learning exercise to understand Vue.js concepts while solving a real-world problem.

## ✨ Features

- 📋 **Billing Information Input**: Enter current and next cycle estimated costs
- 📅 **Date Management**: Configure billing cycle dates and payment schedules
- 💰 **Payment Calculations**: Automatic calculation of recommended weekly payments
- 📱 **Mobile Responsive**: Works seamlessly on desktop and mobile devices
- 💾 **Data Persistence**: Save and load your data locally in the browser
- 🎯 **Real-time Updates**: All calculations update automatically as you type

## 🚀 Live Demo

The application runs locally on your machine. Follow the setup instructions below to get started.

## 📊 How It Works

1. **Enter Your Billing Information**
   - Current cycle estimated cost
   - Next cycle estimated cost
   - Any power already purchased
   - Current account balance (credit/debt)

2. **Set Your Billing Dates**
   - Today's date
   - Current billing cycle start and end dates
   - Days to align with your payment schedule (Tuesday paydays)

3. **Get Your Payment Plan**
   - The app calculates how much to pay weekly
   - Payments are aligned with your payday schedule
   - Accounts for spillover days and existing balances

## 🛠️ Technology Stack

- **Vue.js 3** - Progressive JavaScript framework
- **Vite** - Fast build tool and development server
- **Vanilla CSS** - Custom responsive styling
- **Local Storage** - Browser-based data persistence

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/power-bill-planner.git
   cd power-bill-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 📚 Learning Vue.js

This project demonstrates many Vue.js concepts:

- **Composition API** - Modern Vue 3 reactive programming
- **Component Architecture** - Reusable, maintainable components
- **Reactive Data** - Automatic UI updates when data changes
- **Computed Properties** - Efficient calculated values
- **Event Handling** - User interaction management
- **Props & Events** - Parent-child component communication
- **Lifecycle Hooks** - Component lifecycle management
- **Scoped Styling** - Component-specific CSS

For a detailed explanation of Vue concepts used, see [VUE_LEARNING_GUIDE.md](./VUE_LEARNING_GUIDE.md).

## 🏗️ Project Structure

```
src/
├── App.vue                 # Main application component
├── main.js                 # Application entry point
├── style.css              # Global styles
├── components/
│   ├── InputSection.vue    # Reusable form input component
│   ├── ResultsDisplay.vue  # Results and calculations display
│   └── SaveLoadControls.vue # Data save/load functionality
└── services/
    └── StorageService.js   # Local storage management
```

## 🎯 Example Calculation

Based on your example spreadsheet:

- **Current Cycle Estimate**: $381.81
- **Next Cycle Estimate**: $377.75
- **Account Balance**: $9.46 (credit)
- **Billing Period**: 25 May 2025 - 24 Jun 2025
- **Result**: ~$89.66 weekly payment recommendation

## 🔧 Customization

The application can be easily customized:

1. **Change Payment Day**: Modify the day calculation in the `calculateTuesdaysLeft` function
2. **Currency Format**: Update the `formatCurrency` method in ResultsDisplay.vue
3. **Add Fields**: Extend the `billingFields` or `dateFields` arrays
4. **Styling**: Modify CSS variables in `style.css`

## 📱 Mobile Features

- Touch-friendly interface
- Responsive grid layout
- Optimized input controls
- Collapsible detail sections

## 🔒 Privacy

- All data is stored locally in your browser
- No data is sent to external servers
- Clear data option available
- Works completely offline

## 🐛 Known Issues

- Date calculations assume standard monthly cycles
- Currency is formatted for Australian dollars (AUD)
- Browser storage has size limitations

## 🚀 Future Enhancements

- [ ] Export calculations to PDF/CSV
- [ ] Visual charts for payment schedules
- [ ] Multiple billing cycle support
- [ ] Email/SMS payment reminders
- [ ] Progressive Web App features
- [ ] TypeScript support

## 🤝 Contributing

This is a learning project, but contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Vue.js team for the excellent framework
- Vite team for the fast build tools
- The spreadsheet this replaces for inspiring the calculations

---

Built with ❤️ and Vue.js for learning and practical power bill management.