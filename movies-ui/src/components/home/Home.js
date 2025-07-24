import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { handleLogError } from '../misc/Helpers';
import { strategiesApi } from '../misc/StrategiesApi';
import StrategyList from './StrategyList';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [strategies, setStrategies] = useState([]);

  useEffect(() => {
    const fetchStrategies = async () => {
      setIsLoading(true);
      try {
        const response = await strategiesApi.getStrategies();
        setStrategies(response.data);
      } catch (error) {
        handleLogError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStrategies();
  }, []);

  return isLoading ? null : (
    <Container>
      <StrategyList strategies={strategies} />
    </Container>
  );
}

export default Home;
